import re

with open('styles.css', 'r') as f:
    content = f.read()

# Replace root variables
content = content.replace('--bg-dark-alt: #0A0A14;', '--bg-dark-alt: #0A0A10;')
content = content.replace('--card-bg: #12121E;', '--card-bg: #111116;')
content = content.replace('--accent-primary: #00F0FF;', '--accent-primary: #FFB000;')
content = content.replace('--accent-primary-hover: #00C4D1;', '--accent-primary-hover: #FF9900;')
content = content.replace('--accent-secondary: #B026FF;', '--accent-secondary: #FF6600;')
content = content.replace('--accent-purple: #3B82F6;', '--accent-purple: #FF9900;')

# Replace rgba colors
content = content.replace('rgba(0, 240, 255', 'rgba(255, 176, 0')
content = content.replace('rgba(176, 38, 255', 'rgba(255, 102, 0')

# Also any hex codes like #00F0FF that might be hardcoded outside root?
content = content.replace('#00F0FF', '#FFB000')
content = content.replace('#B026FF', '#FF6600')
content = content.replace('#3B82F6', '#FF9900')

with open('styles.css', 'w') as f:
    f.write(content)
