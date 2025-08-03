document.addEventListener("DOMContentLoaded", () => {
  const boot = document.getElementById("bootSequence");
  const intro = document.getElementById("introContainer");
  const bootLines = document.querySelectorAll(".boot-line");

  // Inicializar efectos cyberpunk
  initializeCyberpunkEffects();
  
  // Inicializar Matrix rain
  createMatrixRain();
  
  // Inicializar robot y scanner
  initializeRobot();
  initializeScanner();
  
  // Actualizar tiempo en el HUD
  updateTime();
  setInterval(updateTime, 1000);

  // Animar las líneas de boot secuencialmente
  bootLines.forEach((line, index) => {
    const delay = parseInt(line.getAttribute("data-delay")) || index * 600;
    setTimeout(() => {
      line.style.animationDelay = "0s";
      line.style.opacity = "1";
      line.style.transform = "translateX(0)";
      
      // Sonido de boot
      playBootSound();
    }, delay);
  });

  // Espera 5 segundos y muestra la bienvenida
  setTimeout(() => {
    boot.style.opacity = "0";
    boot.style.transform = "scale(0.8)";
    setTimeout(() => {
      boot.style.display = "none";
      intro.classList.remove("hidden");
      
      // Activar efectos de bienvenida
      activateWelcomeEffects();
    }, 500);
  }, 5000);

  // Permitir saltar la intro con cualquier tecla después de 2 segundos
  let canSkip = false;
  setTimeout(() => { canSkip = true; }, 2000);
  
  document.addEventListener("keydown", () => {
    if (canSkip && !intro.classList.contains("hidden") === false) {
      boot.style.opacity = "0";
      boot.style.transform = "scale(0.8)";
      setTimeout(() => {
        boot.style.display = "none";
        intro.classList.remove("hidden");
        activateWelcomeEffects();
      }, 300);
    }
  });

  // También permitir click para saltar
  boot.addEventListener("click", () => {
    if (canSkip) {
      boot.style.opacity = "0";
      boot.style.transform = "scale(0.8)";
      setTimeout(() => {
        boot.style.display = "none";
        intro.classList.remove("hidden");
        activateWelcomeEffects();
      }, 300);
    }
  });
});

// Efectos cyberpunk
function initializeCyberpunkEffects() {
  // Crear partículas flotantes
  createFloatingParticles();
  
  // Inicializar efectos de ruido
  addGlitchEffects();
}

// Matrix rain effect
function createMatrixRain() {
  const matrixContainer = document.getElementById('matrixRainBg');
  if (!matrixContainer) return;
  
  const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
  
  for (let i = 0; i < 20; i++) {
    const column = document.createElement('div');
    column.style.position = 'absolute';
    column.style.top = '-100px';
    column.style.left = Math.random() * 100 + '%';
    column.style.color = '#00ff00';
    column.style.fontSize = '14px';
    column.style.fontFamily = 'Share Tech Mono, monospace';
    column.style.opacity = '0.7';
    column.style.animation = `matrixFall ${3 + Math.random() * 5}s linear infinite`;
    column.style.animationDelay = Math.random() * 5 + 's';
    
    let text = '';
    for (let j = 0; j < 20; j++) {
      text += characters[Math.floor(Math.random() * characters.length)] + '<br>';
    }
    column.innerHTML = text;
    
    matrixContainer.appendChild(column);
  }
}

// Robot functionality
function initializeRobot() {
  const robot = document.getElementById('holoRobot');
  const robotText = document.getElementById('robotText');
  
  if (!robot || !robotText) return;
  
  const messages = [
    'Iniciando sistemas...',
    'Neural link establecido',
    'Escaneando usuario...',
    'Bienvenida Catalina',
    'Sistema listo ✓',
    'Acceso autorizado'
  ];
  
  let messageIndex = 0;
  
  setInterval(() => {
    robotText.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;
  }, 3000);
  
  // Interactividad del robot
  robot.addEventListener('click', () => {
    robot.style.transform = 'scale(1.1)';
    setTimeout(() => {
      robot.style.transform = 'scale(1)';
    }, 200);
    
    robotText.textContent = '¡Hola! Sistema activo 🤖';
  });
}

// Scanner functionality
function initializeScanner() {
  const scanner = document.getElementById('bioScanner');
  if (!scanner) return;
  
  // Efectos de sonido del scanner
  setInterval(() => {
    if (Math.random() > 0.7) {
      playBootSound();
    }
  }, 2000);
}

// Floating particles
function createFloatingParticles() {
  const container = document.getElementById('cyberParticles');
  if (!container) return;
  
  for (let i = 0; i < 5; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '2px';
    particle.style.height = '2px';
    particle.style.background = i % 2 === 0 ? '#00ffff' : '#ff0080';
    particle.style.borderRadius = '50%';
    particle.style.boxShadow = `0 0 8px ${i % 2 === 0 ? '#00ffff' : '#ff0080'}`;
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animation = `particleFloat ${5 + Math.random() * 10}s ease-in-out infinite`;
    particle.style.animationDelay = Math.random() * 5 + 's';
    
    container.appendChild(particle);
  }
}

// Glitch effects
function addGlitchEffects() {
  setInterval(() => {
    const elements = document.querySelectorAll('.glitch-text');
    elements.forEach(el => {
      if (Math.random() > 0.95) {
        el.style.textShadow = '2px 0 #ff0080, -2px 0 #00ffff';
        setTimeout(() => {
          el.style.textShadow = '0 0 5px var(--accent-color), 0 0 10px var(--accent-color), 0 0 15px var(--accent-color)';
        }, 100);
      }
    });
  }, 500);
}

// Welcome effects
function activateWelcomeEffects() {
  // Reproducir sonido de bienvenida
  setTimeout(() => {
    if (window.cyberpunkAudio) {
      cyberpunkAudio.play('powerUp');
    }
  }, 500);
  
  // Animar las líneas cyber
  const cyberLines = document.querySelectorAll('.cyber-line');
  cyberLines.forEach((line, index) => {
    setTimeout(() => {
      line.style.animation = 'typewriterCyber 0.8s ease forwards';
      // Sonido de typing para cada línea
      if (window.cyberpunkAudio) {
        cyberpunkAudio.play('terminalType');
      }
    }, index * 500);
  });
  
  // Efecto de stats
  setTimeout(() => {
    animateStats();
    // Sonido de sistema activándose
    if (window.cyberpunkAudio) {
      cyberpunkAudio.neuralPulse();
    }
  }, 2000);
}

// Animate stats bars
function animateStats() {
  const statFills = document.querySelectorAll('.stat-fill');
  statFills.forEach((fill, index) => {
    setTimeout(() => {
      const width = fill.style.width;
      fill.style.width = '0%';
      setTimeout(() => {
        fill.style.transition = 'width 2s ease';
        fill.style.width = width;
      }, 100);
    }, index * 300);
  });
}

// Update time in HUD
function updateTime() {
  const timeElement = document.getElementById('currentTime');
  if (timeElement) {
    const now = new Date();
    const time = now.toLocaleTimeString('es-CL', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    timeElement.textContent = time;
  }
}

// Sound effects - Mejorado con sistema cyberpunk
function playBootSound() {
  // Usar el nuevo sistema de audio si está disponible
  if (window.cyberpunkAudio) {
    cyberpunkAudio.play('powerUp');
  } else {
    // Fallback al sistema original
    const bootSound = document.getElementById('bootSound');
    if (bootSound) {
      bootSound.currentTime = 0;
      bootSound.volume = 0.3;
      bootSound.play().catch(() => {}); // Ignore autoplay restrictions
    }
  }
}

function playClickSound() {
  if (window.cyberpunkAudio) {
    cyberpunkAudio.play('click');
  } else {
    const clickSound = document.getElementById('clickSound');
    if (clickSound) {
      clickSound.currentTime = 0;
      clickSound.volume = 0.5;
      clickSound.play().catch(() => {});
    }
  }
}

// Nuevas funciones de sonido cyberpunk
function playMatrixSound() {
  if (window.cyberpunkAudio) {
    cyberpunkAudio.play('matrixBeep');
  }
}

function playNeuralPulse() {
  if (window.cyberpunkAudio) {
    cyberpunkAudio.neuralPulse();
  }
}

function playGlitchEffect() {
  if (window.cyberpunkAudio) {
    cyberpunkAudio.glitchEffect();
  }
}

// Maneja el click para entrar al escritorio
function enterDesktop() {
  playClickSound();
  
  // Efecto de transición cyberpunk
  const intro = document.getElementById('introContainer');
  intro.style.filter = 'brightness(1.5) saturate(2)';
  intro.style.transform = 'scale(1.1)';
  
  setTimeout(() => {
    intro.style.filter = 'brightness(0)';
    intro.style.transform = 'scale(0.8)';
    setTimeout(() => {
      window.location.href = "escritorio.html";
    }, 500);
  }, 300);
}

// Agregar estilos CSS dinámicos para las animaciones
const style = document.createElement('style');
style.textContent = `
  @keyframes matrixFall {
    0% { transform: translateY(-100px); opacity: 1; }
    100% { transform: translateY(100vh); opacity: 0; }
  }
  
  @keyframes particleFloat {
    0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
    50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
  }
`;
document.head.appendChild(style);

// === FUNCIONALIDAD TERMINAL AI INTERACTIVO ===

// Comandos de IA para el terminal
const aiCommands = {
    ML: [
        'python train_classifier.py --epochs 100',
        'from sklearn.model_selection import train_test_split',
        'from tensorflow.keras import Sequential',
        'model.fit(X_train, y_train, validation_split=0.2)',
        'accuracy_score(y_test, predictions)'
    ],
    DL: [
        'import tensorflow as tf',
        'model = tf.keras.models.Sequential()',
        'model.add(Dense(128, activation="relu"))',
        'model.compile(optimizer="adam", loss="categorical_crossentropy")',
        'history = model.fit(train_data, epochs=50)'
    ],
    RL: [
        'import gymnasium as gym',
        'from stable_baselines3 import PPO',
        'env = gym.make("CartPole-v1")',
        'model = PPO("MlpPolicy", env, verbose=1)',
        'model.learn(total_timesteps=10000)'
    ],
    love: [
        'print("Desarrollando IA con pasión 💖")',
        'echo "Neural networks trained with love"',
        'git commit -m "AI improvements with ❤️"',
        'python love_algorithm.py --mode=caring',
        'echo "Building the future with AI and love 🤖�"'
    ]
};

// Respuestas del sistema para cada tipo de comando de IA
const aiResponses = {
    ML: [
        '✓ Model trained successfully - Accuracy: 94.2%',
        '✓ Feature engineering completed',
        '✓ Cross-validation score: 0.91',
        '✓ Hyperparameters optimized',
        '✓ Machine Learning pipeline ready'
    ],
    DL: [
        '✓ Neural network architecture defined',
        '✓ Deep learning model compiled',
        '✓ Training completed - Loss: 0.0847',
        '✓ Gradient descent converged',
        '✓ Model saved successfully'
    ],
    RL: [
        '✓ Environment initialized',
        '✓ Agent training completed',
        '✓ Policy optimization successful',
        '✓ Reward function maximized',
        '✓ Reinforcement learning model deployed'
    ],
    love: [
        '💖 AI developed with love and passion',
        '🤖💕 Neural network trained with care',
        '✨ Code compiled with positive energy',
        '� Algorithm optimized with heart',
        '🌟 AI system blessed with love 💖'
    ]
};

// Función para simular comando de IA
function executeAICommand(commandType) {
    const terminal = document.querySelector('.matrix-love-text');
    if (!terminal) return;

    // Reproducir sonido de beep de Matrix
    if (window.cyberpunkAudio) {
        cyberpunkAudio.play('matrixBeep');
    }

    const commands = aiCommands[commandType];
    const responses = aiResponses[commandType];
    
    if (!commands || !responses) return;

    // Comando aleatorio
    const randomCommand = commands[Math.floor(Math.random() * commands.length)];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    // Crear nueva línea de comando
    const commandLine = document.createElement('div');
    commandLine.className = 'love-line';
    commandLine.innerHTML = `
        <span class="prompt">catalina@neural-network:~$</span>
        <span class="command">${randomCommand}</span>
    `;

    // Crear línea de respuesta
    const responseLine = document.createElement('div');
    responseLine.className = 'love-line response';
    responseLine.style.color = commandType === 'love' ? '#ff6b9d' : '#00aaff';
    responseLine.innerHTML = randomResponse;

    // Limpiar terminal (mantener solo AI assistant) y agregar nuevas líneas
    const aiAssistant = terminal.querySelector('.ai-assistant');
    terminal.innerHTML = '';
    if (aiAssistant) {
        terminal.appendChild(aiAssistant);
    }
    terminal.appendChild(commandLine);
    
    // Simular typing sound
    if (window.cyberpunkAudio) {
        cyberpunkAudio.play('terminalType');
    }
    
    // Agregar respuesta después de un breve delay
    setTimeout(() => {
        terminal.appendChild(responseLine);
        
        // Sonido especial según el tipo de comando
        if (window.cyberpunkAudio) {
            if (commandType === 'love') {
                cyberpunkAudio.play('powerUp');
            } else {
                cyberpunkAudio.play('neuralPulse');
            }
        }
        
        // Agregar cursor parpadeante
        const cursor = document.createElement('div');
        cursor.className = 'love-line';
        cursor.innerHTML = '<span class="prompt">catalina@neural-network:~$</span><span class="cursor">_</span>';
        terminal.appendChild(cursor);
    }, 800);
}

// Inicializar funcionalidad del terminal AI cuando se carga la página
function initializeAITerminal() {
    // Buscar botones del AI terminal con un delay para asegurar que existen
    setTimeout(() => {
        const aiButtons = document.querySelectorAll('.ai-btn');
        aiButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const command = button.getAttribute('data-cmd');
                executeAICommand(command);
                
                // Efecto visual en el botón
                button.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    button.style.transform = 'scale(1)';
                }, 150);
            });
        });

        // Comando inicial aleatorio para la ventana
        setTimeout(() => {
            const initialCommands = ['ML', 'DL'];
            const randomInitial = initialCommands[Math.floor(Math.random() * initialCommands.length)];
            executeAICommand(randomInitial);
        }, 1000);
    }, 500);
}

// Terminal de typing effect para el hacker principal
function startHackerTyping() {
    setTimeout(() => {
        const typingElements = document.querySelectorAll('.typing');
        
        typingElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            
            let i = 0;
            const typeInterval = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typeInterval);
                    // Reiniciar el ciclo
                    setTimeout(() => {
                        element.textContent = '';
                        i = 0;
                        const restartInterval = setInterval(() => {
                            if (i < text.length) {
                                element.textContent += text.charAt(i);
                                i++;
                            } else {
                                clearInterval(restartInterval);
                            }
                        }, 100);
                    }, 3000);
                }
            }, 100);
        });
    }, 1000);
}

// Efecto de glitch para elementos cyberpunk
function addCyberpunkGlitchEffect() {
    setTimeout(() => {
        const glitchElements = document.querySelectorAll('.terminal-title, .matrix-love-title');
        
        glitchElements.forEach(element => {
            setInterval(() => {
                if (Math.random() < 0.1) {
                    element.style.textShadow = `
                        0 0 8px #00ff00,
                        2px 0 0 #ff0080,
                        -2px 0 0 #00ffff
                    `;
                    setTimeout(() => {
                        element.style.textShadow = '0 0 8px #00ff00';
                    }, 100);
                }
            }, 2000);
        });
    }, 1000);
}

// Inicializar el terminal AI en el escritorio
function initializeDesktopAITerminal() {
    // Solo ejecutar si estamos en escritorio.html
    if (window.location.pathname.includes('escritorio.html')) {
        initializeAITerminal();
        startHackerTyping();
        addCyberpunkGlitchEffect();
    }
}

// Ejecutar cuando se carga el DOM
document.addEventListener('DOMContentLoaded', function() {
    // Ejecutar después de que el resto del código se haya inicializado
    setTimeout(() => {
        initializeDesktopAITerminal();
    }, 2000);
});

// También ejecutar cuando se cambia la ventana (para SPA)
window.addEventListener('load', function() {
    setTimeout(() => {
        initializeDesktopAITerminal();
    }, 1000);
});

