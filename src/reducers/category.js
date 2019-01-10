const defaultState = {
    category: [{
        name: 'technology',
        img: 'img/tech.jpeg'    },
        {
            name: 'sport',
            img: 'img/sport.jpeg'        },
        {
            name: 'lifestyle',
            img: 'img/lifestyle.jpeg'
        },
    ]
};

export default (state = defaultState, action) => {
    switch (action.type) {

        default:
            return state
    }
}


