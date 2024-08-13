const Footer = () => {
  return (
    <div className=" w-full flex  justify-around   items-center text-white sm:flex-nowrap flex-wrap mt-24   ff p-4">
      <article className="flex flex-col w-full max-sm:py-5 max-sm:px-0 p-5 max-sm:after:border-b-1   self-baseline ">
        <p className="font-bold text-base mb-3">JACK & JONES</p>
        <ul>
          <li className="text-sm my-2">About JACK & JONES</li>
          <li className="text-sm my-2">Jobs & Careers</li>
          <li className="text-sm my-2">Sustainability</li>
          <li className="text-sm my-2">Certificates </li>
        </ul>
      </article>
      <article className="flex flex-col w-full max-sm:py-5 max-sm:px-0 p-5 max-sm:after:border-b-1   self-baseline ">
        <p className="font-bold text-base mb-3">Help</p>
        <ul>
          <li className="text-sm my-2">Where is my order? </li>
          <li className="text-sm my-2">What delivery options do you offer? </li>
          <li className="text-sm my-2">Return here</li>
          <li className="text-sm my-2">How do I get in touch?</li>
          <li className="text-sm my-2">Terms and conditions</li>
          <li className="text-sm my-2">Privacy policy</li>
        </ul>
      </article>
      <article className="flex flex-col w-full max-sm:py-5 max-sm:px-0 p-5  self-baseline">
        <p className="font-bold text-base mb-3">About Bestseller</p>
        <ul>
          <li className="text-sm my-2">About Bestseller</li>
          <li className="text-sm my-2">Jobs</li>
          <li className="text-sm my-2">Corporate news</li>
        </ul>
      </article>
    </div>
  );
};

export default Footer;
