import React from 'react'

// CSS
import './footer-styles.css'

const Footer = () => {

    const getYear = new Date().getFullYear()

    return (
        <footer>
            <h3> Copyright &copy; Social-Lorem {getYear} </h3>
        </footer>
    )
}

export default Footer