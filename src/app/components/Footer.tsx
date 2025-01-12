// interface FooterProps {
//     // Define any props here if needed
// }

const Footer = () => {
    return (
        <footer className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                About
              </h3>
              <div className="mt-4">
                <a href="/about" className="text-base text-gray-500 hover:text-gray-900">
                  Our Story
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Legal
              </h3>
              <div className="mt-4 space-y-4">
                <a href="/privacy" className="text-base text-gray-500 hover:text-gray-900 block">
                  Privacy Policy
                </a>
                <a href="/terms" className="text-base text-gray-500 hover:text-gray-900 block">
                  Terms of Service
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Social
              </h3>
              <div className="mt-4 space-y-4">
                <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">
                  Twitter
                </a>
                <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">
                  Facebook
                </a>
                <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
};

export default Footer;