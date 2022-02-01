import React from "react"
import {Link} from 'react-router-dom'

const Footer = () => <footer id='footer-1' className="page-footer font-small blue pt-4 text-white bg-dark" >
    <div className="container-fluid text-center text-md-left" >
        <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
                <h3 className="text-uppercase">Buy-Easy™ </h3>
                <h5>Developed by<a href="https://www.linkedin.com/in/abhi03kumar/" target="_blank" rel="noopener noreferrer"> Abhishek Kumar </a></h5>
            </div>

            <hr className="clearfix w-100 d-md-none pb-0"/>

            <div className="col-md-3 mb-md-0 mb-3" >
                <h5 className="text-uppercase">Company</h5>
                <ul className="list-unstyled">
                    <li><Link to='#'>About Us</Link></li>
                    <li><Link to='#'>Our Services</Link></li>
                    <li><Link to='#'>Careers</Link></li>
                    <li><Link to='#'>Privacy Policy</Link></li>
                </ul>
                
            </div>

            <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase">Follow Us</h5>
                <ul className="list-unstyled">
                    <li><Link to='#'><i className="fab fa-instagram" style={{fontSize:30}}></i></Link></li>
                    <li><Link to='#'><i className="fab fa-youtube" style={{fontSize:30}}></i></Link></li>
                    <li><Link to='#'><i className="fab fa-github" style={{fontSize:30}}></i></Link></li>
                    <li><Link to='#'><i className="fab fa-twitter" style={{fontSize:30}}></i></Link></li>
                </ul>
            </div>
        </div>
    </div>

    <div className="footer-copyright text-center py-3">© 2021-22 <Link to="/">Buy-Easy™</Link>
    </div>

</footer>

export default Footer