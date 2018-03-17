import css from './styles.scss';

window.onload = function currentYear() {
    let currentyear = new Date().getFullYear();
    document.getElementById("copyright").innerText = currentyear;
}