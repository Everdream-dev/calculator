document.addEventListener('DOMContentLoaded', function() {
    // Calculadora de Precios
    const baseImponible = document.getElementById('baseImponible');
    const iva = document.getElementById('iva');
    const margen = document.getElementById('margen');
    const precioFinal = document.getElementById('precioFinal');
    const baseImponibleOutput = document.getElementById('baseImponibleOutput');
    const calcularPrecioBtn = document.getElementById('calcularPrecio');
    const calcularBaseBtn = document.getElementById('calcularBase');
    const keypadButtons = document.querySelectorAll('.keypad button');

    // Calculadora de Edad
    const fechaNacimiento = document.getElementById('fechaNacimiento');
    const fechaCalculo = document.getElementById('fechaCalculo');
    const edad = document.getElementById('edad');
    const calcularEdadBtn = document.getElementById('calcularEdad');

    let activeInput = null;

    function setActiveInput(input) {
        activeInput = input;
        input.focus();
    }

    [baseImponible, iva, margen, precioFinal].forEach(input => {
        input.addEventListener('focus', () => setActiveInput(input));
    });

    keypadButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (!activeInput) return;

            if (button.textContent === 'C') {
                activeInput.value = '';
            } else {
                activeInput.value += button.textContent;
            }
        });
    });

    calcularPrecioBtn.addEventListener('click', () => {
        const base = parseFloat(baseImponible.value) || 0;
        const ivaValue = parseFloat(iva.value) || 0;
        const margenValue = parseFloat(margen.value) || 0;

        const precioConIva = base * (1 + ivaValue / 100);
        const precioFinalValue = precioConIva * (1 + margenValue / 100);

        precioFinal.value = precioFinalValue.toFixed(2);
        baseImponibleOutput.textContent = base.toFixed(2);
    });

    calcularBaseBtn.addEventListener('click', () => {
        const precio = parseFloat(precioFinal.value) || 0;
        const ivaValue = parseFloat(iva.value) || 0;
        const margenValue = parseFloat(margen.value) || 0;

        const precioSinMargen = precio / (1 + margenValue / 100);
        const baseImponibleValue = precioSinMargen / (1 + ivaValue / 100);

        baseImponible.value = baseImponibleValue.toFixed(2);
        baseImponibleOutput.textContent = baseImponibleValue.toFixed(2);
    });

    // Funcionalidad de la Calculadora de Edad
    calcularEdadBtn.addEventListener('click', () => {
        const nacimiento = new Date(fechaNacimiento.value);
        const calculo = new Date(fechaCalculo.value);

        if (isNaN(nacimiento.getTime()) || isNaN(calculo.getTime())) {
            edad.value = 'Fechas inválidas';
            return;
        }

        let years = calculo.getFullYear() - nacimiento.getFullYear();
        let months = calculo.getMonth() - nacimiento.getMonth();
        let days = calculo.getDate() - nacimiento.getDate();

        if (days < 0) {
            months--;
            days += new Date(calculo.getFullYear(), calculo.getMonth(), 0).getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        let result = '';
        if (years > 0) result += years + (years === 1 ? ' año ' : ' años ');
        if (months > 0) result += months + (months === 1 ? ' mes ' : ' meses ');
        if (days > 0) result += days + (days === 1 ? ' día' : ' días');

        edad.value = result.trim();
    });

    // Establecer la fecha actual como valor predeterminado para la fecha de cálculo
    const hoy = new Date().toISOString().split('T')[0];
    fechaCalculo.value = hoy;
});