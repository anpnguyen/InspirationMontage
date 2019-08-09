import React , {useState}from 'react'
import './PhotoStage.css'
import axios from 'axios';
// import PropTypes from 'prop-types'

function PhotoStage(props) {

    const [searchState, setSearch] = useState({searchParams:"", images:[""], loading:true})

    const {searchParams, images, loading} = searchState

    const [formData, setFormData] = useState({search: ""})

    const {search} = formData
  
   







    return (
        <div className='PhotoStage'>
            <img src="https://source.unsplash.com/1600x900/?nature" alt=""/>
            <img src="https://source.unsplash.com/1500x800/?nature" alt=""/>
            <img src="https://source.unsplash.com/1400x700/?nature" alt=""/>
           

        
            
        </div>
    )
}


export default PhotoStage

