function Calculadora() {
    this.tabela = document.querySelector('table');
    this.tela = document.querySelector('.tela');

    this.numNovo = true;
    this.numAntigo;
    this.operador;

    this.iniciar = () => this.cliqueBotoes();

    this.cliqueBotoes = () => {
        this.tabela.addEventListener('click', (e) => {
            const elemento = e.target;

            if (elemento.classList.contains('btn-num')) this.btnNumero(elemento.innerText);

            if (elemento.classList.contains('btn-virg')) this.addVirgula(elemento.innerText);

            if (elemento.classList.contains('btn-operador')) this.btnOperador(elemento.innerText);

            if (elemento.classList.contains('btn-limpar-tela')) this.btnLimparTela();

            if (elemento.classList.contains('btn-limpar-calculo')) this.btnLimparCalculo();

            if (elemento.classList.contains('btn-del')) this.btnApagar();

            if (elemento.classList.contains('btn-igual')) this.ativarIgual();
        });
    };

    this.btnNumero = (valor) => this.atualizarTela(valor);

    this.addVirgula = () => {
        if (!this.tela.value) {
            this.tela.value += '0.';
            this.numNovo = false;
        } else if (this.tela.value.indexOf('.') === -1) {
            this.tela.value += '.';
        }
    }

    this.btnOperador = (operador) => {
        if (!this.numNovo) {
            this.calcular();
            this.operador = operador;
            this.numNovo = true;
            numAntigo = Number(this.tela.value);
        }

        if (operador === '±') this.atualizarTela(-(Number(this.tela.value)));
    }

    this.btnLimparTela = () => this.tela.value = '';

    this.btnLimparCalculo = () => {
        this.btnLimparTela();
        this.numNovo = true;
        this.operador = undefined;
    }

    this.btnApagar = () => this.tela.value = this.tela.value.slice(0, -1);

    this.ativarIgual = () => this.calcular();

    this.operacaoPendente = () => this.operador !== undefined;

    this.calcular = () => {
        if (this.operacaoPendente()) {
            this.numNovo = true;

            if (this.operador === '+') this.atualizarTela(Number(numAntigo) + Number(this.tela.value));

            if (this.operador === '-') this.atualizarTela(Number(numAntigo) - Number(this.tela.value));

            if (this.operador === 'x') this.atualizarTela(Number(numAntigo) * Number(this.tela.value));

            if (this.operador === '÷') this.atualizarTela(Number(numAntigo) / Number(this.tela.value));

            this.operador = undefined;
        }
    }

    this.atualizarTela = (numero) => {
        if (this.numNovo) {
            this.tela.value = numero;
            this.numNovo = false;
        } else {
            this.tela.value += numero;
        }
    }
}

const calculador = new Calculadora();
calculador.iniciar();
