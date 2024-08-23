document.addEventListener('DOMContentLoaded', function() {
    const encryptBtn = document.getElementById('encrypt-btn');
    const decryptBtn = document.getElementById('decrypt-btn');
    const copyBtn = document.getElementById('copy-btn');
    const inputTextElem = document.getElementById('input-text');
    const outputTextElem = document.getElementById('output-text');
    const placeholderContent = document.getElementById('placeholder-content');

    encryptBtn.addEventListener('click', () => handleTextTransformation('encrypt'));
    decryptBtn.addEventListener('click', () => handleTextTransformation('decrypt'));
    copyBtn.addEventListener('click', copyToClipboard);

    function handleTextTransformation(action) {
        const text = inputTextElem.value.toLowerCase();

        if (text.trim() === '') {
            alert('Ingrese un texto.');
            return;
        }

        if (containsSpecialCharacters(text)) {
            alert('El texto contiene caracteres especiales no permitidos.');
            return;
        }

        const transformations = {
            encrypt: [
                [/e/g, 'enter'],
                [/i/g, 'imes'],
                [/a/g, 'ai'],
                [/o/g, 'ober'],
                [/u/g, 'ufat']
            ],
            decrypt: [
                [/enter/g, 'e'],
                [/imes/g, 'i'],
                [/ai/g, 'a'],
                [/ober/g, 'o'],
                [/ufat/g, 'u']
            ]
        };

        let transformedText = text;

        transformations[action].forEach(([pattern, replacement]) => {
            transformedText = transformedText.replace(pattern, replacement);
        });

        outputTextElem.value = transformedText;
        togglePlaceholderAndCopyBtn(transformedText.trim());
    }

    function containsSpecialCharacters(text) {
        const specialCharacterPattern = /[^a-z\s]/; // Permite solo letras minúsculas y espacios
        return specialCharacterPattern.test(text);
    }

    function togglePlaceholderAndCopyBtn(text) {
        const isTextEmpty = text === '';
        placeholderContent.style.display = isTextEmpty ? 'flex' : 'none';
        copyBtn.style.display = isTextEmpty ? 'none' : 'block';
    }

    function copyToClipboard() {
        outputTextElem.select();
        outputTextElem.setSelectionRange(0, 99999); // Para dispositivos móviles
        document.execCommand('copy');
        alert('Texto copiado al portapapeles');
    }
});