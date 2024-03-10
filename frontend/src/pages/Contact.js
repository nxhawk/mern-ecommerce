import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import { AiOutlineHome, AiOutlineMail } from 'react-icons/ai'
import { BiPhoneCall, BiInfoCircle } from 'react-icons/bi'

const Contact = () => {
  return (
    <>
      <Meta title='Contact Us' />
      <BreadCrumb title='Contact Us' />
      <div className='contact-wrapper py-5 home-wrapper-2'>
        <div className='container-xl'>
          <div className='row'>
            <div className='col-12'>
              <iframe
                title='myFrame'
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.451249835259!2d106.05205467424365!3d21.17422578276842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31350985b294c8c9%3A0xa1634c9edb9bec3e!2zVFJVTkcgVMOCTSDEkEnhu4ZOIFThu6wgQsOBQ0ggS0hPQSBC4bquQyBOSU5I!5e0!3m2!1svi!2s!4v1710086221400!5m2!1svi!2s"
                width="600"
                height="450"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className='border-0 w-100'></iframe>
            </div>
            <div className='col-12 mt-5'>
              <div className='contact-inner-wrapper d-flex justify-content-between'>
                <div>
                  <h3 className='contact-title mb-4'>Contact</h3>
                  <form action='' className='d-flex flex-column gap-15'>
                    <div>
                      <input type='text' className='form-control' placeholder='Name' />
                    </div>
                    <div>
                      <input type='email' className='form-control' placeholder='Email' />
                    </div>
                    <div>
                      <input type='tel' className='form-control' placeholder='Mobile Number' />
                    </div>
                    <div>
                      <textarea name='' id='' rows="3" cols="30" className='w-100 form-control' placeholder='Comments' />
                    </div>
                    <div>
                      <button className='button border-0'>Submit</button>
                    </div>
                  </form>
                </div>
                <div>
                  <h3 className='contact-title mb-4'>Get in touch with us</h3>
                  <div>
                    <ul className='ps-0'>
                      <li className='mb-3 d-flex gap-15 align-items-center'>
                        <AiOutlineHome className='fs-5' />
                        <address className='mb-0'>Hno: 277 , Near village chopal , Mandaura, Sonipat, Haryan</address>
                      </li>
                      <li className='mb-3 d-flex gap-15 align-items-center'>
                        <BiPhoneCall className='fs-5' />
                        <a href='tel:+91 765743535'>+91 765743535</a>
                      </li>
                      <li className='mb-3 d-flex gap-15 align-items-center'>
                        <AiOutlineMail className='fs-5' />
                        <a href='mailto:admin@gmail.com'>admin@gmail.com</a>
                      </li>
                      <li className='mb-3 d-flex gap-15 align-items-center'>
                        <BiInfoCircle className='fs-5' />
                        <p className='mb-0'>Monday - Friday 10 AM - 8 PM </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact