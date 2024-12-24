import { AiFillInstagram } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { AiOutlineTwitter } from "react-icons/ai";

const Footer = () => {
  return (
    <div className='footer p-8 mb-4 bg-orangeColor rounded-lg grid grid-cols-1 md:grid-cols-5 gap-8 m-auto items-center justify-center'>
      <div className='col-span-1'>
        <div className="logoDiv">
          <h1 className="logo text-2xl text-white pb-4">
            <strong>Career</strong>Fit
          </h1>
        </div>
        <p className="text-white pb-4 opacity-70 leading-7">
          We always make our seekers and companies find the best jobs and employers find the best candidates.
        </p>
      </div>

      <div className='grid col-span-1'>
        <span className='divTitle text-lg font-semibold pb-4 text-white'>
          Company
        </span>
        <ul className='grid gap-3'>
          <li className='text-white opacity-70 hover:opacity-100'>About Us</li>
          <li className='text-white opacity-70 hover:opacity-100'>Features</li>
          <li className='text-white opacity-70 hover:opacity-100'>News</li>
          <li className='text-white opacity-70 hover:opacity-100'>FAQ</li>
        </ul>
      </div>

      <div className='grid col-span-1'>
        <span className='divTitle text-lg font-semibold pb-4 text-white'>
          Resources
        </span>
        <ul className='grid gap-3'>
          <li className='text-white opacity-70 hover:opacity-100'>Account</li>
          <li className='text-white opacity-70 hover:opacity-100'>Support</li>
          <li className='text-white opacity-70 hover:opacity-100'>Feedback</li>
          <li className='text-white opacity-70 hover:opacity-100'>Contact Us</li>
        </ul>
      </div>

      <div className='grid col-span-1'>
        <span className='divTitle text-lg font-semibold pb-4 text-white'>
          Support
        </span>
        <ul className='grid gap-3'>
          <li className='text-white opacity-70 hover:opacity-100'>Events</li>
          <li className='text-white opacity-70 hover:opacity-100'>Promo</li>
          <li className='text-white opacity-70 hover:opacity-100'>Req Demo</li>
          <li className='text-white opacity-70 hover:opacity-100'>Careers</li>
        </ul>
      </div>

      <div className='grid col-span-1'>
        <span className='divTitle text-lg font-semibold pb-4 text-white'>
          Contact Info
        </span>
        <div>
          <small className='text-white opacity-70 hover:opacity-100'>
            Vertextech@outlook.com
          </small>
          <div className='icons flex gap-4 py-4'>
            <AiFillInstagram className='bg-white p-2 h-8 w-8 rounded-full icon text-orangeColor' />
            <BsFacebook className='bg-white p-2 h-8 w-8 rounded-full icon text-orangeColor' />
            <AiOutlineTwitter className='bg-white p-2 h-8 w-8 rounded-full icon text-orangeColor' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;