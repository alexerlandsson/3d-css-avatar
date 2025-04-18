document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  const scene = document.getElementById('scene');
  
  // Maximum rotation angles in degrees
  const MAX_ROTATION_X = 65; // 65 degrees in each direction horizontally
  const MAX_ROTATION_Y = 25; // 25 degrees in each direction vertically
  
  // Current rotation values
  let rotationX = 0;
  let rotationY = 0;
  
  // Function to update the rotation based on mouse position
  function updateRotation(mouseX, mouseY) {
    // Get body dimensions
    const bodyWidth = document.body.clientWidth;
    const bodyHeight = document.body.clientHeight;
    
    // Calculate the center of the body
    const centerX = bodyWidth / 2;
    const centerY = bodyHeight / 2;
    
    // Calculate distance from center as a percentage of body dimensions
    const distanceX = (mouseX - centerX) / (bodyWidth / 2);
    const distanceY = (mouseY - centerY) / (bodyHeight / 2);
    
    // Calculate rotation (clamped to max values)
    rotationX = Math.max(-MAX_ROTATION_X, Math.min(MAX_ROTATION_X, distanceX * MAX_ROTATION_X));
    rotationY = Math.max(-MAX_ROTATION_Y, Math.min(MAX_ROTATION_Y, -distanceY * MAX_ROTATION_Y)); // Inverted Y axis
    
    // Apply rotation (note: X is horizontal rotation around Y axis, and Y is vertical rotation around X axis)
    canvas.style.transform = `rotateX(${rotationY}deg) rotateY(${rotationX}deg)`;
  }
  
  // Handle cursor movement over the entire document for full rotation capability
  document.addEventListener('mousemove', (event) => {
    // Always update rotation regardless of cursor position
    updateRotation(event.clientX, event.clientY);
  });
  
  // Handle touchmove for mobile devices
  document.addEventListener('touchmove', (event) => {
    if (event.touches.length > 0) {
      const touch = event.touches[0];
      updateRotation(touch.clientX, touch.clientY);
    }
  }, { passive: false });
  
  // Prevent default touch behavior on the body to avoid scrolling while rotating
  document.body.addEventListener('touchmove', (event) => {
    event.preventDefault();
  }, { passive: false });
});