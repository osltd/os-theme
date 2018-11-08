const defaultState = {
    feeds: [
        {
            src:'https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/07/05/11/running-10k.jpg?w968',        title:'HOT TENDS',
            subTitle:'in fashion',



        },  {
            src: 'http://virtualcharityevents.com/wp-content/uploads/2014/10/lady_running_silhouette.jpg',
            title:'NEW FROM VANS ',
            subTitle:'The Sk-8 hi mte revamps the legendary Vans high tops',


        },
        {
            src:'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/healthy-young-woman-on-morning-run-royalty-free-image-856985422-1533935456.jpg?resize=980:*',
            title:'HOT TENDS',
            subTitle:'in fashion',



        },  {
            src:'https://d36hbyt2dpr66x.cloudfront.net/wp-content/uploads/2018/01/Alcohol.AK_.hz_.jpg',
            title:'NEW FROM VANS ',
            subTitle:'The Sk-8 hi mte revamps the legendary Vans high tops',


        },
    ],


};

export default (state = defaultState, action) => {
    switch (action.type) {

        default:
            return state
    }
}


