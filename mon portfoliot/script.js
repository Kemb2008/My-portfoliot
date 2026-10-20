/* ========================================================
   SCRIPT INTERACTIF : TERMINAL CLI, MODALS CV & CERTIFICATS
   Portfolio de KANKOE EKOUÉ MAWUKO BARNABE
   ======================================================== */

// Fonction globale d'ouverture du zoom image (certificats)
function openImageModal(imgSrc, title) {
    const imageModal = document.getElementById('image-modal');
    const imageModalImg = document.getElementById('image-modal-img');
    const imageModalTitle = document.getElementById('image-modal-title');
    if (imageModal && imageModalImg) {
        imageModalImg.src = imgSrc;
        if (imageModalTitle) imageModalTitle.innerText = title;
        imageModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------
    // 1. Menu Mobile Toggle
    // ----------------------------------------------------
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
        });
    }

    // ----------------------------------------------------
    // 2. Gestion de la Modal CV
    // ----------------------------------------------------
    const cvModal = document.getElementById('cv-modal');
    const closeCvModalBtn = document.getElementById('close-cv-modal-btn');

    const openCvBtns = [
        document.getElementById('open-cv-btn-nav'),
        document.getElementById('open-cv-btn-hero'),
        document.getElementById('open-cv-btn-card'),
        document.getElementById('open-cv-btn-mobile')
    ];

    function openCvModal() {
        if (cvModal) {
            cvModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeCvModal() {
        if (cvModal) {
            cvModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    }

    openCvBtns.forEach(btn => {
        if (btn) btn.addEventListener('click', openCvModal);
    });

    if (closeCvModalBtn) {
        closeCvModalBtn.addEventListener('click', closeCvModal);
    }

    if (cvModal) {
        cvModal.addEventListener('click', (e) => {
            if (e.target === cvModal) closeCvModal();
        });
    }

    // ----------------------------------------------------
    // 3. Modal Zoom Image pour les Certificats
    // ----------------------------------------------------
    const imageModal = document.getElementById('image-modal');
    const closeImageModalBtn = document.getElementById('close-image-modal-btn');

    function closeImageModal() {
        if (imageModal) {
            imageModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    }

    if (closeImageModalBtn) {
        closeImageModalBtn.addEventListener('click', closeImageModal);
    }

    if (imageModal) {
        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal) closeImageModal();
        });
    }

    // Gestion touche Échap (ferme la modal active)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (imageModal && !imageModal.classList.contains('hidden')) {
                closeImageModal();
            } else if (cvModal && !cvModal.classList.contains('hidden')) {
                closeCvModal();
            }
        }
    });

    // ----------------------------------------------------
    // 4. Boutons de Copie Rapide (Email & Téléphone)
    // ----------------------------------------------------
    const copyEmailBtn = document.getElementById('copy-email-btn');
    const copyPhoneBtn = document.getElementById('copy-phone-btn');
    const copyToast = document.getElementById('copy-toast');
    const toastMessage = document.getElementById('toast-message');

    function showToast(message) {
        if (copyToast && toastMessage) {
            toastMessage.innerText = message;
            copyToast.classList.remove('hidden');
            setTimeout(() => {
                copyToast.classList.add('hidden');
            }, 3000);
        }
    }

    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            const email = "barnabekankoe58@gmail.com";
            navigator.clipboard.writeText(email).then(() => {
                showToast("Adresse e-mail copiée : " + email);
            }).catch(() => {
                alert("Email : " + email);
            });
        });
    }

    if (copyPhoneBtn) {
        copyPhoneBtn.addEventListener('click', () => {
            const phone = "+228 70 66 35 13";
            navigator.clipboard.writeText("+22870663513").then(() => {
                showToast("Numéro copié : " + phone);
            }).catch(() => {
                alert("Téléphone : " + phone);
            });
        });
    }

    // ----------------------------------------------------
    // 5. Filtrage Dynamique des Projets
    // ----------------------------------------------------
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => {
                b.classList.remove('active', 'bg-cyan-500', 'text-slate-950', 'font-semibold');
                b.classList.add('bg-slate-800', 'text-slate-300');
            });
            btn.classList.add('active', 'bg-cyan-500', 'text-slate-950', 'font-semibold');
            btn.classList.remove('bg-slate-800', 'text-slate-300');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ----------------------------------------------------
    // 6. Émulateur de Terminal Interactif pour Recruteurs
    // ----------------------------------------------------
    const terminalBody = document.getElementById('terminal-body');
    const terminalInput = document.getElementById('terminal-input');
    const terminalSubmit = document.getElementById('terminal-submit');
    const cmdPills = document.querySelectorAll('.cmd-pill');

    const commandHistory = [];
    let historyIndex = -1;

    // Commandes complètes avec les 5 certifications et formations
    const commands = {
        'help': `
<span class="text-cyan-400 font-bold">COMMANDES DISPONIBLES :</span>
  <span class="text-emerald-300">whoami</span>       : Profil de KANKOE EKOUÉ MAWUKO BARNABE
  <span class="text-emerald-300">certifs</span>      : Mes 5 certifications officielles (WorldTech, Cisco & ESIG)
  <span class="text-emerald-300">formations</span>   : Formations académiques (Licence 1 & 2 ESIG, Bac D)
  <span class="text-emerald-300">skills</span>       : Compétences (Sécurité réseau, Linux, HTML/CSS, Programmation)
  <span class="text-emerald-300">projects</span>     : Projets pratiques réalisés (Vêtements vintage ESIG, Base SQL)
  <span class="text-emerald-300">contact</span>      : Téléphone (+228 70 66 35 13), email et WhatsApp
  <span class="text-emerald-300">cv</span>           : Ouvrir le CV officiel en PDF
  <span class="text-emerald-300">photo</span>        : Afficher la photo officielle de profil
  <span class="text-emerald-300">clear</span>        : Réinitialiser l'écran du terminal
`,
        'whoami': `
<span class="text-white font-bold">KANKOE EKOUÉ MAWUKO BARNABE</span> — Lomé, Togo
• <span class="text-cyan-300">Profil</span> : Étudiant en deuxième année de Licence en Informatique à <strong>ESIG Global Success</strong>.
• <span class="text-slate-300">Description</span> : Motivé, sérieux et désireux de développer mes compétences dans le domaine du numérique, je m’intéresse à la programmation, aux systèmes d’exploitation et à la sécurité réseau.
• <span class="text-amber-400 font-bold">Certifications (5)</span> :
  1. WorldTech University : Fondamentaux de la sécurité réseau (Oct 2026)
  2. Cisco Networking Academy : Introduction à la cybersécurité (Oct 2026)
  3. Cisco Networking Academy : Introduction à l'IA moderne (Oct 2026)
  4. ESIG Global Success : Attestation de participation, projet marketplace Vintage (Avr 2026)
  5. WorldTech University : Bases de la cybersécurité (Oct 2026)
• <span class="text-emerald-300">Disponibilité</span> : Recherche active de Stage ou Alternance.
`,
        'certifs': `
<span class="text-cyan-400 font-bold">MES 5 CERTIFICATIONS OFFICIELLES VÉRIFIÉES :</span>

1. <span class="text-amber-400 font-bold">Fondamentaux de la sécurité réseau</span> — <strong>WorldTech University</strong>
   • Date d'achèvement : 17 Octobre 2026 • Enseignant : Mohammed Muneef
   • Identifiant : <span class="text-amber-300 font-bold">WTU-2026-V4X2W7</span>
   • Modules complétés (25 leçons) :
     - Thinking Like a Network Defender
     - Firewalls
     - Segmentation, Zero Trust & Remote Access
     - Secure Wi-Fi
     - Monitoring and Hardening

2. <span class="text-emerald-400 font-bold">Introduction à la cybersécurité</span> — <strong>Cisco Networking Academy</strong>
   • Date d'achèvement : 16 Octobre 2026
   • Identifiant : <span class="text-cyan-300">e068ad90-b886-42d1-aff1-eaa76eb38e23</span>
   • Programme : Confidentialité, intégrité, disponibilité, menaces et sécurité réseau.

3. <span class="text-emerald-400 font-bold">Introduction à l'IA moderne</span> — <strong>Cisco Networking Academy</strong>
   • Date d'achèvement : 16 Octobre 2026
   • Identifiant : <span class="text-emerald-300">5a326274-a256-42a6-b8a2-c7d4f205c7b5</span>
   • Programme : Machine Learning, modèles de langage, impact sociotechnique de l'IA.

4. <span class="text-violet-400 font-bold">Attestation de participation</span> — <strong>ESIG Global Success</strong>
   • Délivrée le 30 Avril 2026 à Lomé • Directeur Général : Kokou SEDJRO
   • Projet : Réalisation d'une plateforme de vente Vintage en ligne (marketplace)
   • Cadre : 10e semaine de professionnalisation (16 au 30 Avril 2026).

5. <span class="text-amber-400 font-bold">Bases de la cybersécurité</span> — <strong>WorldTech University</strong>
   • Date d'achèvement : 17 Octobre 2026 • Niveau : Débutant
   • Identifiant : <span class="text-amber-300 font-bold">WTU-2026-UPL83N</span>
   • Modules : Pourquoi la sécurité compte, Mots de passe et phishing, Appareils, réseaux et réaction en cas d'incident.
`,
        'formations': `
<span class="text-cyan-400 font-bold">FORMATIONS ACADÉMIQUES :</span>
• <span class="text-emerald-400 font-bold">2026 – 2027</span> : <strong>LICENCE 2 EN INFORMATIQUE</strong>
  ESIG Global Success — En cours
• <span class="text-emerald-400 font-bold">2025 – 2026</span> : <strong>LICENCE 1 EN INFORMATIQUE</strong>
  ESIG Global Success
• <span class="text-slate-300 font-bold">2024 – 2025</span> : <strong>BACCALAURÉAT DEUXIEME PARTIE, SÉRIE D</strong>
  Lycée GBENYEDZI-KOPE
• <span class="text-slate-400 font-bold">2023 – 2024</span> : <strong>BACCALAURÉAT PREMIERE PARTIE, SÉRIE D</strong>
  Lycée GBENYEDZI-KOPE
`,
        'skills': `
<span class="text-cyan-400 font-bold">COMPÉTENCES TECHNIQUES :</span>
• <span class="text-amber-300 font-semibold">Sécurité Réseau</span>     : Firewalls, Zero Trust, Segmentation, Monitoring & Hardening (WorldTech)
• <span class="text-emerald-300 font-semibold">Systèmes d’exploitation</span> : Windows et Linux (shell, permissions)
• <span class="text-purple-300 font-semibold">Développement web</span>       : Notions de HTML et CSS (pages web responsives)
• <span class="text-yellow-300 font-semibold">Programmation</span>          : Java, Python, Algorithmique et POO
• <span class="text-cyan-300 font-semibold">Bases de données</span>         : Modélisation et requêtes SQL
• <span class="text-emerald-300 font-semibold">Aptitudes</span>               : Apprentissage autonome et grande capacité d’adaptation
`,
        'projects': `
<span class="text-cyan-400 font-bold">PROJETS RÉALISÉS :</span>
1. <span class="text-white font-semibold">Site de vente de vêtements vintage (ESIG)</span> : 
   Plateforme web pratique conçue pour les étudiants de l'ESIG avec HTML et CSS.
2. <span class="text-white font-semibold">Site web connecté à une base de données</span> : 
   Gestion et persistance des données avec requêtes SQL d'enregistrement et d'affichage.
3. <span class="text-white font-semibold">Pratique des Systèmes Linux & Réseaux</span> : 
   Administration système de base, commandes shell et étude des protocoles TCP/IP.
`,
        'contact': `
<span class="text-cyan-400 font-bold">COORDONNÉES DIRECTES :</span>
• <span class="text-emerald-400 font-bold">Nom</span>       : KANKOE EKOUÉ MAWUKO BARNABE
• <span class="text-emerald-400 font-bold">Ville</span>     : Lomé, Togo
• <span class="text-emerald-400 font-bold">Téléphone</span> : <a href="tel:+22870663513" class="text-white underline">+228 70 66 35 13</a> (Appels & WhatsApp)
• <span class="text-emerald-400 font-bold">Email</span>     : <a href="mailto:barnabekankoe58@gmail.com" class="text-cyan-300 underline">barnabekankoe58@gmail.com</a>
• <span class="text-emerald-400 font-bold">WhatsApp</span>  : <a href="https://wa.me/22870663513" target="_blank" class="text-emerald-300 underline">wa.me/22870663513</a>
`,
        'cv': `
<span class="text-purple-400 font-bold">CURRICULUM VITAE :</span>
Ouverture du CV officiel... Vous pouvez le consulter ou télécharger le fichier PDF original en 1 clic !
`,
        'photo': `
<span class="text-cyan-400 font-bold">PHOTO OFFICIELLE :</span>
Affichage de la photo d'identité de KANKOE Ekoué Mawuko Barnabé en haute définition...
`
    };

    function executeCommand(inputCmd) {
        const rawCmd = inputCmd.trim();
        const cmd = rawCmd.toLowerCase();

        if (!rawCmd) return;

        commandHistory.push(rawCmd);
        historyIndex = commandHistory.length;

        const commandLine = document.createElement('div');
        commandLine.className = 'terminal-output-line flex items-center gap-2 mt-2';
        commandLine.innerHTML = `<span class="text-emerald-400 font-bold">barnabe@esig-global-success</span><span class="text-slate-500">:</span><span class="text-cyan-400 font-bold">~</span><span class="text-slate-300">$</span> <span class="text-white font-semibold">${escapeHtml(rawCmd)}</span>`;
        terminalBody.appendChild(commandLine);

        if (cmd === 'clear') {
            terminalBody.innerHTML = `
                <div class="text-slate-400">
                    Console réinitialisée.<br/>
                    Tapez <span class="text-cyan-400 font-bold">help</span> ou <span class="text-emerald-400 font-bold">whoami</span> pour la liste des commandes.
                </div>
            `;
        } else if (commands[cmd]) {
            const responseDiv = document.createElement('div');
            responseDiv.className = 'terminal-output-line text-xs leading-relaxed text-slate-300';
            responseDiv.innerHTML = commands[cmd];
            terminalBody.appendChild(responseDiv);

            if (cmd === 'cv') {
                setTimeout(openCvModal, 600);
            } else if (cmd === 'photo') {
                setTimeout(() => openImageModal('photo-barnabe.jpg', 'KANKOE Ekoué Mawuko Barnabé'), 500);
            }
        } else {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'terminal-output-line text-xs text-red-400';
            errorDiv.innerHTML = `Commande inconnue: "${escapeHtml(rawCmd)}". Tapez <span class="text-cyan-300 font-bold underline cursor-pointer" onclick="document.getElementById('terminal-input').value='help'; document.getElementById('terminal-submit').click();">help</span> pour voir les commandes disponibles.`;
            terminalBody.appendChild(errorDiv);
        }

        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.innerText = text;
        return div.innerHTML;
    }

    if (terminalSubmit && terminalInput) {
        terminalSubmit.addEventListener('click', () => {
            executeCommand(terminalInput.value);
            terminalInput.value = '';
        });

        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                executeCommand(terminalInput.value);
                terminalInput.value = '';
            } else if (e.key === 'ArrowUp') {
                if (historyIndex > 0) {
                    historyIndex--;
                    terminalInput.value = commandHistory[historyIndex];
                }
            } else if (e.key === 'ArrowDown') {
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    terminalInput.value = commandHistory[historyIndex];
                } else {
                    historyIndex = commandHistory.length;
                    terminalInput.value = '';
                }
            } else if (e.key === 'Tab') {
                e.preventDefault();
                const currentVal = terminalInput.value.toLowerCase().trim();
                const availableCmds = Object.keys(commands).concat(['clear']);
                const match = availableCmds.find(c => c.startsWith(currentVal));
                if (match) {
                    terminalInput.value = match;
                }
            }
        });
    }

    cmdPills.forEach(pill => {
        pill.addEventListener('click', () => {
            const cmd = pill.getAttribute('data-cmd');
            if (cmd) {
                executeCommand(cmd);
                if (terminalInput) terminalInput.value = '';
            }
        });
    });

    // ----------------------------------------------------
    // 7. Canvas Arrière-Plan : Pluie Numérique Cyber (Discrète)
    // ----------------------------------------------------
    const canvas = document.getElementById('cyber-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const chars = '01ABCDEF0123456789<>/*{}[]=';
        const fontSize = 14;
        const columns = Math.floor(width / fontSize);
        const drops = Array(columns).fill(1);

        function drawMatrix() {
            ctx.fillStyle = 'rgba(8, 12, 20, 0.08)';
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = '#06b6d4';
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        setInterval(drawMatrix, 50);
    }

});
