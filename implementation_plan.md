# Implementation Plan: Dynamic Date Display based on Day of Week

## Goal Description
Display the workshop dates dynamically based on the day of the week:
- On the day before the workshop (Friday): Display the date in the Hero section indicating "Tomorrow, [Date], 7:00 PM" and hide it from the second section.
- On the days of the workshop (Saturday & Sunday): Display the date in the Hero section indicating "Today Evening 7:00 PM" and hide it from the second section.
- On remaining days (Monday-Thursday): Remove it from the Hero section and display it in the second section below the button (like it is currently).

## User Review Required & Open Questions
1. **Hero Section Placement**: I plan to add the dynamic date text directly below the CTA button (under "Get Free Bonuses worth ₹10,488!") in the Hero section. Is this placement correct?
2. **Date Text for Friday**: For Friday, should the text exactly be "Tomorrow, [Sat Date] & [Sun Date] at 7:00 PM (IST)" or something else?
3. **Date Text for Sat/Sun**: For Saturday and Sunday, should it exactly be "Today Evening 7:00 PM"?
4. **Three Landing Pages**: I will update `2smb/index.html`, `2smb/b.html`, and `2smb-g/index.html`. Are these the correct three pages?

## Proposed Changes

### HTML Changes (for `2smb/index.html`, `2smb/b.html`, and `2smb-g/index.html`)
- **Hero Section**: Add a placeholder `<p class="hero-dynamic-date cta-subtext mt-2"></p>` below the CTA button in the hero section.
- **Second Section**: Add a class `second-section-dynamic-date` to the existing `<p class="cta-subtext mt-2">Live on Zoom...` below the second section button.

### JS Changes (`script.js`)
- Update `updateWorkshopDate()` to check the current day of the week using `nowIST.getDay()`.
- If Friday (5):
  - Show `.hero-dynamic-date` with text: `Live on Zoom • Tomorrow, ${satDay} & ${sunDay} ${satMonth} • Time: 7:00 PM - 9:00 PM (IST)`
  - Hide `.second-section-dynamic-date`.
- If Saturday (6) or Sunday (0):
  - Show `.hero-dynamic-date` with text: `Live on Zoom • Today Evening 7:00 PM (IST)`
  - Hide `.second-section-dynamic-date`.
- If Monday-Thursday (1-4):
  - Hide `.hero-dynamic-date`.
  - Show `.second-section-dynamic-date` with the regular text: `Live on Zoom • Date: ${formattedDateText} • Time: 7:00 PM - 9:00 PM (IST)`.

## Verification Plan
1. Manually test the logic in `script.js` by overriding `nowIST` to simulate a Friday, a Saturday, and a Wednesday, and verifying the elements display correctly.
2. Check all three landing pages to ensure the classes are correctly applied.
