import React from 'react'
import spinner from "./spinner.gif"

const Loading = () => {
    return (
        <div className="text-center">
            <img className="my-3" src={spinner} alt="loading" width="30px"/>
        </div>
    )
}

export default Loading
