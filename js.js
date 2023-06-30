const app = new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: 0x000000,
        resolution: window.devicePixelRatio || 1,
      });

      // Add the PixiJS canvas to the HTML document
      document.body.appendChild(app.view);

      // Create a container for the particles
      const particlesContainer = new PIXI.Container();
      app.stage.addChild(particlesContainer);

      // Particle settings
      const particleCount = 100; // Number of particles to generate
      const particleSpeed = 2; // Speed at which particles move
      const particleSize = 5; // Size of particles
      const particleColors = [0xFF0000, 0x00FF00, 0x0000FF]; // Array of colors for particles

      // Generate particles
      for (let i = 0; i < particleCount; i++) {
        const particle = new PIXI.Graphics();
        const randomColor = particleColors[Math.floor(Math.random() * particleColors.length)];
        particle.beginFill(randomColor);
        particle.drawRect(-particleSize / 2, -particleSize / 2, particleSize, particleSize);
        particle.endFill();
        particle.x = Math.random() * app.screen.width; // Random x position within the screen width
        particle.y = Math.random() * app.screen.height; // Random y position within the screen height
        particle.vx = (Math.random() - 0.5) * particleSpeed; // Random velocity on x-axis
        particle.vy = (Math.random() - 0.5) * particleSpeed; // Random velocity on y-axis
        particlesContainer.addChild(particle);
      }

      // Animation loop
      app.ticker.add(() => {
        for (let i = 0; i < particlesContainer.children.length; i++) {
          const particle = particlesContainer.children[i];
          particle.x += particle.vx;
          particle.y += particle.vy;

          // Wrap particles around to the other side of the screen
          if (particle.x < 0) {
            particle.x = app.screen.width;
          }
          if (particle.x > app.screen.width) {
            particle.x = 0;
          }
          if (particle.y < 0) {
            particle.y = app.screen.height;
          }
          if (particle.y > app.screen.height) {
            particle.y = 0;
          }
        }
      });
