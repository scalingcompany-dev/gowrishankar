// db-helper.js
// Handles database integration, view tracking, click tracking, and WhatsApp URL syncing.

(function() {
  let isFirebaseReady = false;
  let db = null;

  // Initialize Firebase if configured
  if (typeof firebase !== 'undefined' && typeof firebaseConfig !== 'undefined' && firebaseConfig.apiKey !== 'YOUR_API_KEY') {
    try {
      firebase.initializeApp(firebaseConfig);
      db = firebase.database();
      isFirebaseReady = true;
      console.log("Firebase initialized successfully.");
    } catch (e) {
      console.error("Firebase initialization failed:", e);
    }
  } else {
    console.warn("Firebase config not set up yet. Running in fallback/offline mode.");
  }

  // Exposed helper object on window
  window.dbHelper = {
    isConfigured: function() {
      return isFirebaseReady;
    },

    // Get WhatsApp Group URL from DB, with fallback
    getWhatsappUrl: function(callback) {
      if (!isFirebaseReady) {
        callback(defaultWhatsappUrl);
        return;
      }

      db.ref('config/whatsapp_url').once('value').then(function(snapshot) {
        const url = snapshot.val();
        callback(url || defaultWhatsappUrl);
      }).catch(function(err) {
        console.error("Error reading WhatsApp URL from DB:", err);
        callback(defaultWhatsappUrl);
      });
    },

    // Update WhatsApp Group URL
    updateWhatsappUrl: function(url, callback) {
      if (!isFirebaseReady) {
        console.error("Firebase not initialized. Cannot update WhatsApp URL.");
        if (callback) callback(false);
        return;
      }

      db.ref('config/whatsapp_url').set(url).then(function() {
        if (callback) callback(true);
      }).catch(function(err) {
        console.error("Error updating WhatsApp URL in DB:", err);
        if (callback) callback(false);
      });
    },

    // Get Traffic Split for Variant A (0 to 100). Default is 50.
    getTrafficSplit: function(callback) {
      if (!isFirebaseReady) {
        callback(50);
        return;
      }

      db.ref('config/traffic_split_a').once('value').then(function(snapshot) {
        const val = snapshot.val();
        const split = parseInt(val, 10);
        callback(!isNaN(split) ? split : 50);
      }).catch(function(err) {
        console.error("Error reading traffic split from DB:", err);
        callback(50);
      });
    },

    // Update Traffic Split for Variant A
    updateTrafficSplit: function(percentage, callback) {
      if (!isFirebaseReady) {
        console.error("Firebase not initialized. Cannot update traffic split.");
        if (callback) callback(false);
        return;
      }

      db.ref('config/traffic_split_a').set(percentage).then(function() {
        if (callback) callback(true);
      }).catch(function(err) {
        console.error("Error updating traffic split in DB:", err);
        if (callback) callback(false);
      });
    },

    // Track a Page View for a variant ('A' or 'B')
    trackView: function(variant) {
      if (!isFirebaseReady || !variant) return;

      const path = 'metrics/variant_' + variant.toLowerCase() + '/views';
      db.ref(path).transaction(function(currentValue) {
        return (currentValue || 0) + 1;
      }).catch(function(err) {
        console.error("Error tracking view:", err);
      });
    },

    // Track a Click for a variant ('A' or 'B'), with a callback for redirection
    trackClick: function(variant, callback) {
      if (!isFirebaseReady || !variant) {
        if (callback) callback();
        return;
      }

      const path = 'metrics/variant_' + variant.toLowerCase() + '/clicks';
      db.ref(path).transaction(function(currentValue) {
        return (currentValue || 0) + 1;
      }).then(function() {
        if (callback) callback();
      }).catch(function(err) {
        console.error("Error tracking click:", err);
        if (callback) callback();
      });
    },

    // Get metrics for all variants
    getMetrics: function(callback) {
      if (!isFirebaseReady) {
        callback(null);
        return;
      }

      db.ref('metrics').once('value').then(function(snapshot) {
        callback(snapshot.val());
      }).catch(function(err) {
        console.error("Error reading metrics from DB:", err);
        callback(null);
      });
    },

    // Listen to real-time metrics updates
    listenToMetrics: function(callback) {
      if (!isFirebaseReady) return null;

      const ref = db.ref('metrics');
      ref.on('value', function(snapshot) {
        callback(snapshot.val());
      });
      return ref;
    },

    // Reset Metrics
    resetMetrics: function(callback) {
      if (!isFirebaseReady) {
        if (callback) callback(false);
        return;
      }

      db.ref('metrics').set({
        variant_a: { views: 0, clicks: 0 },
        variant_b: { views: 0, clicks: 0 }
      }).then(function() {
        if (callback) callback(true);
      }).catch(function(err) {
        console.error("Error resetting metrics:", err);
        if (callback) callback(false);
      });
    }
  };
})();
