import React, {useEffect} from 'react'
import '../components/privacy.css';
import { Link } from '@mui/material';
import { Helmet } from 'react-helmet-async';

const Privacy = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className='priv-main'>
            <Helmet>
                <title>Privacy Policy</title>
                <meta name='description' content='Privacy Policy'/>
            </Helmet>
            <h1>Privacy Policy</h1>
            <p>Last updated: April 30, 2022</p>
            <p>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</p>
            <p>We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.</p>
            
            <h1>Collecting and Using Your Personal Data</h1>
            <h2>Types of Data Collected</h2>
            <h3>Personal Data</h3>
            <p>While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:</p>
            <ul>
            <li>
            <p>Email address</p>
            </li>
            <li>
            <p>First name and last name</p>
            </li>
            <li>
            <p>Phone number</p>
            </li>
            <li>
            <p>Address, State, Province, ZIP/Postal code, City</p>
            </li>
            </ul>
            
            <h2>Use of Your Personal Data</h2>
            <p>The Company may use Personal Data for the following purposes:</p>
            <ul>
            <li>
            <p><strong>To provide and maintain our Service</strong>, including to monitor the usage of our Service.</p>
            </li>
            <li>
            <p><strong>To manage Your Account:</strong> to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.</p>
            </li>
            <li>
            <p><strong>For the performance of a contract:</strong> the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.</p>
            </li>
            <li>
            <p><strong>To contact You:</strong> To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.</p>
            </li>
            <li>
            <p><strong>To manage Your requests:</strong> To attend and manage Your requests to Us.</p>
            </li>
            </ul>

            <h2>Retention of Your Personal Data</h2>
            <p>The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.</p>
            
            <h2>Security of Your Personal Data</h2>
            <p>The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.</p>
            
            <h1>Contact Us</h1>
            <p>If you have any questions about this Privacy Policy, You can contact us:</p>
            <ul>
            <li>By email: 
                <Link underline='none' href="mailto:balajinursery02@gmail.com">
                balajinursery02@gmail.com
                </Link>
            </li>
            </ul>

            <h2>Privacy Policies of services we use:</h2>
            {/* <h2>Firebase</h2> */}
            <ul>
                <li><Link href='https://firebase.google.com/support/privacy' rel='noopener noreferrer' target='_blank'>Firebase Privacy Policy</Link></li>
                <li><Link href='https://razorpay.com/privacy/' rel='noopener noreferrer' target='_blank'>Razorpay Privacy Policy</Link></li>
                <li><Link href='https://www.mailjet.com/security-privacy/' rel='noopener noreferrer' target='_blank'>Mailjet Privacy Policy</Link></li>
            </ul>
            

        </div>
    )
}

export default Privacy