const Footer = () => {
    return (
      <footer className="bg-blue-600 text-white py-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Zepto Lite. All rights reserved.</p>
          <p className="text-sm">Made with ❤️ by Amit Kumar</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  