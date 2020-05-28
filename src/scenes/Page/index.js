import React, { useEffect, useState } from 'react';
import './page.css';
import { connect } from 'react-redux';
import parser from 'html-react-parser';
import { useParams } from 'react-router-dom';


// ------------------------ REDUX ------------------------
const mapStateToProps = state => ({
    shop : state.shop.session
});
// ------------------------ /REDUX ------------------------


function Page(){

    // get filename
    let fileName = useParams().file;
    // text
    let [text, setText] = useState("");

    // ----------------------- HELPERS -----------------------
    useEffect(() => {
        // load text file
        fetchFile(fileName);
    })

    async function fetchFile(file){
        try {
            let text = await fetch(`/assets/text_files/${file}.txt`);
            text = await text.text();
            setText(text);
        } catch (error) {
            setText(`Failed to load ${file}.txt.`);
        }
    }
    // ----------------------- /HELPERS -----------------------


    return (
        <div className="page">
            <div className="content">
                {parser(text)}
            </div>
        </div>
    );
}

export default connect(mapStateToProps)(Page);