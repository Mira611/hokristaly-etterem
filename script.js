// 1. Validáció

const form = document.getElementById('reservationForm');

if (form) {

    const nevInput = document.getElementById('nev');
    const telInput = document.getElementById('telefon');
    const emailInput = document.getElementById('email');
    const letszamInput = document.getElementById('letszam');
    const datumInput = document.getElementById('datum');
    const idoInput = document.getElementById('ido');
    const tipusInput = document.getElementById('tipus');

    const errorNev = document.getElementById('error-nev');
    const errorTel = document.getElementById('error-telefon');
    const errorEmail = document.getElementById('error-email');
    const errorLetszam = document.getElementById('error-letszam');
    const errorDatum = document.getElementById('error-datum');
    const errorIdo = document.getElementById('error-ido');
    const errorTipus = document.getElementById('error-tipus');

    form.addEventListener('submit', function(event) {
        let isValid = true;

        const errors = document.querySelectorAll('.error-msg');
        errors.forEach(el => el.textContent = '');
        
        const inputs = document.querySelectorAll('input, select');
        inputs.forEach(el => el.classList.remove('input-error'));


        if (nevInput.value.trim() === "") {
            errorNev.textContent = "A név megadása kötelező!";
            nevInput.classList.add('input-error');
            isValid = false;
        }

        if (telInput.value.length < 11) {
            errorTel.textContent = "Kérlek valós telefonszámot adj meg!";
            telInput.classList.add('input-error');
            isValid = false;
        }

        if (!emailInput.value.includes('@') || !emailInput.value.includes('.')) {
            errorEmail.textContent = "Érvényes e-mail címet adj meg!";
            emailInput.classList.add('input-error');
            isValid = false;
        }

        if (letszamInput.value < 1 || letszamInput.value > 20) {
            errorLetszam.textContent = "A létszám 1 és 20 között lehet.";
            letszamInput.classList.add('input-error');
            isValid = false;
        }

        if (datumInput.value === "") {
            errorDatum.textContent = "Dátum kiválasztása kötelező!";
            datumInput.classList.add('input-error');
            isValid = false;
        } else {
            const selectedDate = new Date(datumInput.value);
            const today = new Date();
            today.setHours(0,0,0,0);
            if (selectedDate < today) {
                errorDatum.textContent = "Nem foglalhatsz a múltba!";
                datumInput.classList.add('input-error');
                isValid = false;
            }
        }

        if (idoInput.value === "") {
            errorIdo.textContent = "Időpont megadása kötelező!";
            idoInput.classList.add('input-error');
            isValid = false;
        } else {
            if (idoInput.value < "10:00" || idoInput.value > "19:00") {
                errorIdo.textContent = "Nyitvatartás: 10:00 - 20:00 között!";
                idoInput.classList.add('input-error');
                isValid = false;
            }
        }

        if (tipusInput.value === "") {
            errorTipus.textContent = "Kérlek válassz típust!";
            tipusInput.classList.add('input-error');
            isValid = false;
        }

        
        if (!isValid) {
            event.preventDefault();
        } else {
            alert("Sikeres foglalás! 🎅");
        }
    });
}

// 2. Visszaszámláló

const countdownElement = document.getElementById('countdown');

if (countdownElement) {
    const updateCountdown = () => {
        const now = new Date();
        const currentYear = now.getFullYear();
        let christmas = new Date(currentYear, 11, 25);

        if (now > christmas) {
            christmas = new Date(currentYear + 1, 11, 25);
        }

        const diff = christmas - now;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `
            <div class="time-unit">
                <span class="number">${days}</span>
                <span class="label">nap</span>
            </div>
            <div class="time-unit">
                <span class="number">${hours}</span>
                <span class="label">óra</span>
            </div>
            <div class="time-unit">
                <span class="number">${minutes}</span>
                <span class="label">perc</span>
            </div>
            <div class="time-unit">
                <span class="number">${seconds}</span>
                <span class="label">mp</span>
            </div>
        `;
    };

    setInterval(updateCountdown, 1000);
    updateCountdown();
}