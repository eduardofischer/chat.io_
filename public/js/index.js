const loginHeader = document.querySelector('#header-box')
const colorSelector = document.querySelectorAll('.color')

colorSelector.forEach(option => {
    option.addEventListener('change', () => {
        loginHeader.style.backgroundColor = option.value;
        console.log('changed color')
    })
})
