// User defined data
data = [
    {
        id: 1,
        img: 'img/slider/1.png',
    }
    ,
    {
        id: 2,
        img: 'img/slider/2.jpg',
    }
    ,
    {
        id: 3,
        img: 'img/slider/3.png',
    }
    ,
    {
        id: 4,
        img: 'img/slider/4.jpg',
    },
    {
        id: 5,
        img: 'img/slider/5.jpg',
    }

]

let sliderSettings = {
    slidePosition: 0,
    slideWidth: 800,
    sliderHeight: 700,
    slideAmount: 800
}


// Select elements
let slides = document.querySelector('.slides');
let slider = document.querySelector('#slider');
let sliderDots = document.querySelector('.slider-dots');

// Set styles
slides.style.width = `${data.length * sliderSettings.slideWidth}px`;
slider.style.width = `${sliderSettings.slideWidth}px`;
slider.style.height = `${sliderSettings.sliderHeight}px`;
// Generate slides
function generateSlides(data) {
    slides.innerHTML = '';
    sliderDots.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        let dot = `<span data="${i}"></span>`;
        let template = `
        <div class="slide" style='width:${sliderSettings.slideAmount}px;' data="${i + 1}">
            <img src="${data[i].img}" alt="">
        </div>
        `
        slides.innerHTML += template;
        sliderDots.innerHTML += dot;
    }
}

//Task 2 - control dots
document.addEventListener('DOMContentLoaded', function () {
    console.log(this.scrollLeft)

    let slidersDots = document.querySelectorAll('.slider-dots span');
    slidersDots.forEach(sliderDot => {
        let dotAccess = sliderDot.getAttribute('data')
        sliderDot.addEventListener('click', function () {
            //  console.log('Element clicked!', dotAccess);
            if (dotAccess) {
                slides.style.transform = `translateX(-${dotAccess * sliderSettings.slideAmount}px)`;
                // Reset background color for all dots
                slidersDots.forEach(dot => {
                    dot.style.background = 'rgba(206, 204, 204, 0.144)';
                });
                // Set background color for the clicked dot
                sliderDot.style.background = 'rgb(180, 179, 179)';
            }
        });

    });
});

// Slide Left
function slideLeft(e) {
    e.preventDefault();
    if (sliderSettings.slidePosition <= 0) {
        sliderSettings.slidePosition = data.length * sliderSettings.slideAmount;
    }
    sliderSettings.slidePosition -= sliderSettings.slideAmount;
    slides.style.transform = `translateX(-${sliderSettings.slidePosition}px)`;
    ///console.log(sliderSettings.slidePosition/sliderSettings.slideAmount)


    //Slide dots change during left click
    let slidersDots = document.querySelectorAll('.slider-dots span');
    slidersDots.forEach(sliderDot => {

        let dotAccess = sliderDot.getAttribute('data')

        sliderDot.style.background = 'rgba(206, 204, 204, 0.144)'
        if (sliderSettings.slidePosition / sliderSettings.slideAmount == dotAccess) {
            sliderDot.style.background = 'rgb(180, 179, 179)'
        }
    });
}
// Slide Right
function slideRight(e) {
    e.preventDefault();
    if (sliderSettings.slidePosition == data.length * sliderSettings.slideAmount) {
        sliderSettings.slidePosition = 0;
    }
    slides.style.transform = `translateX(-${sliderSettings.slidePosition}px)`;
    sliderSettings.slidePosition += sliderSettings.slideAmount;
    //  console.log(sliderSettings.slidePosition/sliderSettings.slideAmount)

    //Slide dots change during right click
    let slidersDots = document.querySelectorAll('.slider-dots span');
    slidersDots.forEach(sliderDot => {

        let dotAccess = sliderDot.getAttribute('data');
        //sliderDot.style.background = 'blue'
        sliderDot.style.background = 'rgba(206, 204, 204, 0.144)'
        if (sliderSettings.slidePosition / sliderSettings.slideAmount - 1 == dotAccess) {
            sliderDot.style.background = 'rgb(180, 179, 179)'
        }
    });

}


// Start app
generateSlides(data);