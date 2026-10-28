/* ============================================
   TECNOLSERVICIOS - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // ============ LOADER ============
    const loader = document.getElementById('loader');
    if (loader) {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                setTimeout(() => loader.classList.add('hidden'), 900);
            });
        });
    }

    // ============ AOS INIT ============
    if (window.AOS) {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 80,
            disable: 'mobile'
        });
    }

    // ============ PARTICLES ============
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.setProperty('--duration', (3 + Math.random() * 5) + 's');
            particle.style.setProperty('--delay', (Math.random() * 5) + 's');
            particle.style.width = (2 + Math.random() * 4) + 'px';
            particle.style.height = particle.style.width;
            particlesContainer.appendChild(particle);
        }
    }

    // ============ NAVBAR ============
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', navToggle.classList.contains('active'));
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveLink() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            
            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);

    // ============ SCROLL TO TOP ============
    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ============ COUNTER ANIMATION ============
    const counters = document.querySelectorAll('.stat-number[data-count]');
    let countersAnimated = false;
    
    function animateCounters() {
        if (countersAnimated) return;
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current);
            }, 16);
        });
        
        countersAnimated = true;
    }
    
    // Intersection Observer for counters
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }

    // ============ SERVICE FILTER ============
    const filterBtns = document.querySelectorAll('.tab-btn');
    const serviceCards = document.querySelectorAll('.service-card');
    const categoryImage = document.getElementById('serviceCategoryImage');
    const categoryLabel = document.getElementById('serviceCategoryLabel');
    const categoryTitle = document.getElementById('serviceCategoryTitle');
    const categoryDescription = document.getElementById('serviceCategoryDescription');
    const categoryVisuals = {
        all: {
            image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=85',
            label: 'TECNOL SERVICIOS VYTLTDA',
            title: 'Mantenimiento integral',
            description: 'Una visión completa de nuestras soluciones para empresas e industrias.'
        },
        preventivo: {
            image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&q=85',
            label: 'PREVENIR ES AVANZAR',
            title: 'Cuidado antes de la falla',
            description: 'Inspecciones y planes programados para mantener cada sistema funcionando.'
        },
        correctivo: {
            image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=1200&q=85',
            label: 'RESPUESTA TECNOL',
            title: 'Soluciones cuando más importan',
            description: 'Intervención técnica rápida para recuperar la operación con precisión.'
        },
        especializado: {
            image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=1200&q=85',
            label: 'INGENIERÍA VYTLTDA',
            title: 'Experiencia para cada desafío',
            description: 'Servicios especializados para proyectos exigentes y espacios únicos.'
        },
        tecnologia: {
            image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=85',
            label: 'EN MANOS DE UN INGENIERO DE SISTEMAS',
            title: 'Tecnología que transforma su operación',
            description: 'Soluciones digitales diseñadas, implementadas y supervisadas por un especialista en Ingeniería de Sistemas.'
        }
    };

    function updateCategoryVisual(filter) {
        const visual = categoryVisuals[filter];
        if (!visual || !categoryImage) return;

        categoryImage.classList.add('is-changing');
        setTimeout(() => {
            categoryImage.src = visual.image;
            categoryImage.alt = visual.title;
            categoryLabel.textContent = visual.label;
            categoryTitle.textContent = visual.title;
            categoryDescription.textContent = visual.description;
            categoryImage.classList.remove('is-changing');
        }, 180);
    }
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            updateCategoryVisual(filter);
            
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            serviceCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ============ QUOTE MODAL ============
    const quoteSection = document.getElementById('cotizar');
    const quoteModalClose = document.getElementById('quoteModalClose');
    const quoteContext = document.getElementById('quoteContext');
    const selectedServiceName = document.getElementById('selectedServiceName');
    const emergencyContext = document.getElementById('emergencyContext');
    const emergencyFloat = document.getElementById('emergencyFloat');

    function openQuoteModal(options = {}) {
        if (!quoteSection) return;

        quoteSection.classList.add('modal-open');
        document.body.classList.add('quote-modal-visible');

        document.querySelectorAll('input[name="servicios"]').forEach(checkbox => {
            checkbox.checked = checkbox.value === options.serviceName;
        });

        if (quoteContext && selectedServiceName) {
            selectedServiceName.textContent = options.serviceName || 'Servicio por definir';
            quoteContext.hidden = !options.serviceName;
        }

        const tipoSelect = document.getElementById('tipoServicio');
        if (options.plan && tipoSelect) {
            tipoSelect.value = 'Plan Mensual';
        }

        const urgencySelect = document.getElementById('urgencia');
        if (urgencySelect) {
            urgencySelect.value = options.emergency ? 'Emergencia' : 'Normal';
        }

        if (emergencyContext) {
            emergencyContext.hidden = !options.emergency;
        }

        if (typeof goToStep === 'function') goToStep(1);
        quoteSection.scrollTop = 0;
    }

    function closeQuoteModal() {
        if (!quoteSection) return;
        quoteSection.classList.remove('modal-open');
        document.body.classList.remove('quote-modal-visible');
    }

    quoteModalClose.addEventListener('click', closeQuoteModal);
    emergencyFloat.addEventListener('click', () => openQuoteModal({ emergency: true }));
    quoteSection.addEventListener('click', (event) => {
        if (event.target === quoteSection) closeQuoteModal();
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeQuoteModal();
    });

    // ============ SERVICE CTA CLICK ============
    document.querySelectorAll('.service-cta').forEach(cta => {
        cta.addEventListener('click', (e) => {
            e.preventDefault();
            const serviceName = cta.getAttribute('data-service');
            openQuoteModal({ serviceName });
        });
    });

    // ============ PRICING CTA ============
    document.querySelectorAll('.pricing-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const plan = btn.getAttribute('data-plan');
            openQuoteModal({ plan });
        });
    });

    document.querySelectorAll('.pricing-email-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const plan = btn.getAttribute('data-plan');
            const subject = `Solicitud de información - ${plan}`;
            const body = `Hola TECNOLSERVICIOS, quiero recibir información sobre el ${plan} de mantenimiento.\n\nNombre: \nEmpresa: \nTeléfono: \nRequerimiento: `;
            window.location.href = `mailto:servicios@tecnolservicios.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        });
    });

    // ============ TESTIMONIAL SLIDER ============
    const track = document.getElementById('testimonialTrack');
    const prevBtn = document.getElementById('testPrev');
    const nextBtn = document.getElementById('testNext');
    const dotsContainer = document.getElementById('testDots');
    
    if (track) {
        const cards = track.querySelectorAll('.testimonial-card');
        let currentSlide = 0;
        const totalSlides = cards.length;
        
        // Create dots
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.className = 'test-dot' + (i === 0 ? ' active' : '');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
        
        function goToSlide(index) {
            currentSlide = index;
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            document.querySelectorAll('.test-dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        }
        
        prevBtn.addEventListener('click', () => {
            goToSlide(currentSlide === 0 ? totalSlides - 1 : currentSlide - 1);
        });
        
        nextBtn.addEventListener('click', () => {
            goToSlide(currentSlide === totalSlides - 1 ? 0 : currentSlide + 1);
        });
        
        // Auto slide
        setInterval(() => {
            goToSlide(currentSlide === totalSlides - 1 ? 0 : currentSlide + 1);
        }, 5000);
    }

    // ============ MULTI-STEP FORM ============
    const form = document.getElementById('quoteForm');
    const steps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    const descriptionField = document.getElementById('descripcion');
    const descriptionCounter = document.getElementById('descriptionCounter');
    const attachmentInput = document.getElementById('adjuntos');
    const attachmentPreview = document.getElementById('attachmentPreview');
    const environmentSelect = document.getElementById('entorno');
    const otherEnvironmentField = document.getElementById('otherEnvironmentField');
    const otherEnvironmentInput = document.getElementById('otroEntorno');

    function updateAttachmentPreview() {
        if (!attachmentInput || !attachmentPreview) return;

        const files = Array.from(attachmentInput.files || []);

        if (!files.length) {
            attachmentPreview.textContent = 'No hay archivos seleccionados.';
            attachmentPreview.classList.remove('has-files');
            return;
        }

        const previews = files.slice(0, 5).map(file => `<span>${file.name}</span>`);
        if (files.length > 5) {
            previews.push(`<span>+${files.length - 5} más</span>`);
        }

        attachmentPreview.innerHTML = previews.join('');
        attachmentPreview.classList.add('has-files');
    }

    attachmentInput?.addEventListener('change', updateAttachmentPreview);
    updateAttachmentPreview();

    function updateOtherEnvironmentField() {
        const isOtherEnvironment = environmentSelect && environmentSelect.value === 'Otro entorno';
        if (!otherEnvironmentField || !otherEnvironmentInput) return;

        otherEnvironmentField.hidden = !isOtherEnvironment;
        otherEnvironmentInput.required = isOtherEnvironment;
        if (!isOtherEnvironment) {
            otherEnvironmentInput.value = '';
            otherEnvironmentField.classList.remove('error');
        }
    }

    environmentSelect?.addEventListener('change', updateOtherEnvironmentField);
    form?.addEventListener('change', event => {
        if (event.target === environmentSelect) updateOtherEnvironmentField();
    });
    otherEnvironmentInput?.addEventListener('input', () => {
        if (otherEnvironmentInput.value.trim()) {
            otherEnvironmentField.classList.remove('error');
        }
    });
    updateOtherEnvironmentField();

    if (descriptionField && descriptionCounter) {
        const updateDescriptionCounter = () => {
            descriptionCounter.textContent = `${descriptionField.value.length} / 20 caracteres mínimos`;
        };
        descriptionField.addEventListener('input', updateDescriptionCounter);
        updateDescriptionCounter();
    }
    
    function goToStep(stepNum) {
        steps.forEach(step => step.classList.remove('active'));
        document.getElementById('step' + stepNum).classList.add('active');
        
        progressSteps.forEach((ps, index) => {
            ps.classList.remove('active', 'completed');
            if (index + 1 < stepNum) {
                ps.classList.add('completed');
            } else if (index + 1 === stepNum) {
                ps.classList.add('active');
            }
        });
    }
    
    // Next buttons
    document.querySelectorAll('.form-next').forEach(btn => {
        btn.addEventListener('click', () => {
            const nextStep = parseInt(btn.getAttribute('data-next'));
            const currentStep = nextStep - 1;
            
            // Validate current step
            if (validateStep(currentStep)) {
                goToStep(nextStep);
            }
        });
    });
    
    // Prev buttons
    document.querySelectorAll('.form-prev').forEach(btn => {
        btn.addEventListener('click', () => {
            const prevStep = parseInt(btn.getAttribute('data-prev'));
            goToStep(prevStep);
        });
    });
    
    function validateStep(step) {
        let isValid = true;
        const currentStepEl = document.getElementById('step' + step);
        const requiredFields = currentStepEl.querySelectorAll('[required]');

        if (step === 2) {
            const serviceSelector = currentStepEl.querySelector('.service-selector');
            const selectedServices = currentStepEl.querySelectorAll('input[name="servicios"]:checked');
            if (selectedServices.length === 0) {
                isValid = false;
                serviceSelector.classList.add('error');
            } else {
                serviceSelector.classList.remove('error');
            }
        }

        if (step === 3 && environmentSelect?.value === 'Otro entorno' && !otherEnvironmentInput?.value.trim()) {
            isValid = false;
            const otherEnvironmentGroup = otherEnvironmentInput.closest('.form-group');
            const errorSpan = otherEnvironmentGroup.querySelector('.form-error');
            otherEnvironmentGroup.classList.add('error');
            errorSpan.textContent = 'Indique dónde se realizará el servicio';
            errorSpan.style.display = 'block';
        }
        
        requiredFields.forEach(field => {
            if (field === otherEnvironmentInput && environmentSelect?.value !== 'Otro entorno') return;
            const formGroup = field.closest('.form-group') || field.closest('.checkbox-group');
            const errorSpan = formGroup ? formGroup.querySelector('.form-error') : null;
            
            if (!field.value.trim() && field.type !== 'checkbox') {
                isValid = false;
                if (formGroup) formGroup.classList.add('error');
                if (errorSpan) {
                    errorSpan.textContent = 'Este campo es requerido';
                    errorSpan.style.display = 'block';
                }
                
                field.addEventListener('input', function handler() {
                    if (formGroup) formGroup.classList.remove('error');
                    if (errorSpan) errorSpan.style.display = 'none';
                    field.removeEventListener('input', handler);
                });
            }

            if (field.minLength > 0 && field.value.trim().length < field.minLength) {
                isValid = false;
                if (formGroup) formGroup.classList.add('error');
                if (errorSpan) {
                    errorSpan.textContent = `Escriba al menos ${field.minLength} caracteres`;
                    errorSpan.style.display = 'block';
                }
            }
            
            // Email validation
            if (field.type === 'email' && field.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(field.value)) {
                    isValid = false;
                    if (formGroup) formGroup.classList.add('error');
                    if (errorSpan) {
                        errorSpan.textContent = 'Ingrese un correo electrónico válido';
                        errorSpan.style.display = 'block';
                    }
                }
            }
        });
        
        if (!isValid) {
            // Shake animation
            currentStepEl.style.animation = 'none';
            currentStepEl.offsetHeight; // trigger reflow
            currentStepEl.style.animation = 'shake 0.5s ease';
        }
        
        return isValid;
    }
    
    // Add shake animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
        }
    `;
    document.head.appendChild(style);

    // ============ FORM SUBMIT ============
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            if (environmentSelect.value === 'Otro entorno' && !otherEnvironmentInput.value.trim()) {
                const otherEnvironmentError = otherEnvironmentField.querySelector('.form-error');
                otherEnvironmentField.classList.add('error');
                otherEnvironmentError.textContent = 'Indique dónde se realizará el servicio';
                otherEnvironmentError.style.display = 'block';
                otherEnvironmentInput.focus();
                return;
            }
            
            // Validate step 3
            if (!validateStep(3)) return;
            
            // Check privacy checkbox
            const privacidad = document.getElementById('privacidad');
            if (!privacidad.checked) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Política de Privacidad',
                    text: 'Debe aceptar la política de privacidad para continuar.',
                    confirmButtonColor: '#0066ff'
                });
                return;
            }
            
            // Collect form data
            const formData = {
                nombre: document.getElementById('nombre').value,
                empresa: document.getElementById('empresa').value,
                email: document.getElementById('email').value,
                telefono: document.getElementById('telefono').value,
                servicios: Array.from(document.querySelectorAll('input[name="servicios"]:checked')).map(cb => cb.value),
                tipoServicio: document.getElementById('tipoServicio').value,
                entorno: document.getElementById('entorno').value,
                otroEntorno: document.getElementById('otroEntorno').value,
                ubicacion: document.getElementById('ubicacion').value,
                urgencia: document.getElementById('urgencia').value,
                descripcion: document.getElementById('descripcion').value,
                presupuesto: document.getElementById('presupuesto').value,
                adjuntos: Array.from(attachmentInput?.files || []).map(file => file.name)
            };
            
            const emailSubject = formData.urgencia === 'Emergencia'
                ? 'EMERGENCIA - Solicitud prioritaria de atención'
                : 'Solicitud de cotización';

            Swal.fire({
                title: 'Enviando cotización...',
                text: 'Estamos enviando sus datos y fotos directamente a nuestro equipo.',
                allowOutsideClick: false,
                showConfirmButton: false,
                didOpen: () => Swal.showLoading()
            });

            const requestData = new FormData(form);
            requestData.set('_subject', emailSubject);
            requestData.set('_replyto', formData.email);
            requestData.set('_template', 'table');
            requestData.set('_captcha', 'false');
            requestData.set('servicios', formData.servicios.join(', ') || 'No especificado');
            requestData.set('entorno', formData.entorno === 'Otro entorno' ? formData.otroEntorno : formData.entorno);
            requestData.set('fotos', formData.adjuntos.length ? formData.adjuntos.join(', ') : 'No se adjuntaron fotos');

            try {
                const response = await fetch('https://formsubmit.co/ajax/servicios@tecnolservicios.com', {
                    method: 'POST',
                    headers: { Accept: 'application/json' },
                    body: requestData
                });

                if (!response.ok) throw new Error('No fue posible enviar la cotización');

                Swal.fire({
                    icon: 'success',
                    title: 'Cotización enviada',
                html: `
                        <p style="margin-bottom: 15px;">Gracias <strong>${formData.nombre}</strong>. Recibimos su solicitud con la información y las fotos adjuntas.</p>
                        <p style="margin-bottom: 15px;">Responderemos al correo <strong>${formData.email}</strong> después de revisar el caso.</p>
                `,
                    confirmButtonColor: '#0066ff'
                });
                form.reset();
                updateAttachmentPreview();
                goToStep(1);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'No se pudo enviar la cotización',
                    text: 'Revise su conexión e inténtelo nuevamente. Sus datos siguen en el formulario.',
                    confirmButtonColor: '#0066ff'
                });
            }
        });
    }

    // ============ WHATSAPP FLOAT ANIMATION ============
    const whatsappFloat = document.getElementById('whatsappFloat');
    
    setTimeout(() => {
        if (whatsappFloat) {
            whatsappFloat.style.animation = 'whatsappBounce 1s ease';
        }
    }, 5000);

    // ============ SMOOTH SCROLL FOR ALL ANCHOR LINKS ============
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            if (this.classList.contains('service-cta') || this.classList.contains('pricing-btn')) {
                return;
            }
            if (this.getAttribute('href') === '#cotizar') {
                openQuoteModal();
                return;
            }
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ============ LAZY SECTIONS ANIMATION ============
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
        sectionObserver.observe(section);
    });

    // ============ NAVBAR CLOSE ON OUTSIDE CLICK ============
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // ============ TYPING EFFECT (Optional Enhancement) ============
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // ============ CONSOLE BRANDING ============
    console.log('%c TECNOLSERVICIOS ', 'background: #0066ff; color: white; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 5px;');
    console.log('%c Mantenimiento Integral Profesional ', 'color: #00d4aa; font-size: 14px; padding: 5px;');
    
});