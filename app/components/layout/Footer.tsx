const Footer = () => {
  return (
    <div className=" w-full flex  justify-around   items-center text-white sm:flex-nowrap flex-wrap mt-24   ff p-4">
      <article className="footer-article">
        <ul>
          <li className="font-bold text-base mb-3">JACK & JONES</li>
          <li className="text-sm my-2 text-slate-200">About JACK & JONES</li>
          <li className="text-sm my-2 text-slate-200">Jobs & Careers</li>
          <li className="text-sm my-2 text-slate-200">Sustainability</li>
          <li className="text-sm my-2 text-slate-200">Certificates </li>
        </ul>
      </article>
      <article className="footer-article">
        <ul>
          <li className="font-bold text-base mb-3">Help</li>
          <li className="text-sm my-2 text-slate-200">Where is my order? </li>
          <li className="text-sm my-2 text-slate-200">What delivery options do you offer? </li>
          <li className="text-sm my-2 text-slate-200">Return here</li>
          <li className="text-sm my-2 text-slate-200">How do I get in touch?</li>
          <li className="text-sm my-2 text-slate-200">Terms and conditions</li>
          <li className="text-sm my-2 text-slate-200">Privacy policy</li>
        </ul>
      </article>
      <article className="footer-article-border-none">
        <ul>
          <li className="font-bold text-base mb-3">About Bestseller</li>
          <li className="text-sm my-2 text-slate-200">About Bestseller</li>
          <li className="text-sm my-2 text-slate-200">Jobs</li>
          <li className="text-sm my-2 text-slate-200">Corporate news</li>
        </ul>
      </article>
    </div>
  );
};

export default Footer;
