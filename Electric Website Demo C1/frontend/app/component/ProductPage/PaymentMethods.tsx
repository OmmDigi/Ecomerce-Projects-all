export function PaymentMethods() {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Visa */}
      <div className="h-8 w-12 rounded border border-gray-200 bg-white flex items-center justify-center">
        <svg className="h-4" viewBox="0 0 48 16" fill="none">
          <path
            d="M18.5 2L15.8 14h-2.9l2.7-12h2.9zm13.6 7.7l1.5-4.2.9 4.2h-2.4zM35 14h2.6l-2.3-12h-2.4c-.5 0-1 .3-1.2.8L26.3 14h3l.6-1.7h3.7L34 14zm-6.8-3.9c0-3.2-4.4-3.4-4.3-4.8 0-.4.4-.9 1.3-1 .4-.1 1.6-.2 2.9.5l.5-2.4c-.7-.3-1.7-.5-2.9-.5-3 0-5.2 1.6-5.2 3.9 0 1.7 1.5 2.6 2.7 3.2 1.2.6 1.6 1 1.6 1.5 0 .8-.9 1.1-1.8 1.1-1.5 0-2.3-.2-3.5-.8l-.6 2.8c.8.4 2.3.7 3.8.7 3.2.1 5.5-1.5 5.5-3.9v-.3zM12.6 2L7.1 14H4L.9 4.5c-.2-.7-.3-1-1-1.3C-.8 2.8-2.4 2.5-3.7 2.2L-3.6 2h6.1c.8 0 1.5.5 1.6 1.4l1.5 8.1L9.7 2h3z"
            fill="#1434CB"
            transform="translate(8 0)"
          />
        </svg>
      </div>

      {/* Mastercard */}
      <div className="h-8 w-12 rounded border border-gray-200 bg-white flex items-center justify-center">
        <svg className="h-5" viewBox="0 0 24 16" fill="none">
          <circle cx="8" cy="8" r="6" fill="#EB001B" />
          <circle cx="16" cy="8" r="6" fill="#F79E1B" />
          <path
            d="M12 3.5a5.98 5.98 0 000 9 5.98 5.98 0 000-9z"
            fill="#FF5F00"
          />
        </svg>
      </div>

      {/* American Express */}
      <div className="h-8 w-12 rounded border border-gray-200 bg-[#006FCF] flex items-center justify-center">
        <svg className="h-3" viewBox="0 0 32 16" fill="white">
          <path d="M0 2h4l1 2h2l-1-2h3l1 2h2l-1-2h3v12H0V2zm17.5 0l-1.8 5.5L14 2h-3v8l-2-8H6L4 10V2H1v12h4l1-3h4l1 3h5V6l2 8h3l2-8v8h3V2h-4l-1.5 5.5z" />
        </svg>
      </div>

      {/* PayPal */}
      <div className="h-8 w-12 rounded border border-gray-200 bg-white flex items-center justify-center">
        <svg className="h-5" viewBox="0 0 24 24" fill="none">
          <path
            d="M19.2 6.5c.3 1.7-.1 3-1.1 4.2-1.1 1.3-2.9 2-5.2 2H11c-.4 0-.7.3-.8.7l-.8 5.2c0 .3-.3.6-.6.6H6.3c-.3 0-.5-.3-.4-.6l2.4-15.2c0-.3.3-.6.6-.6h6.8c1.6 0 2.8.3 3.5 1.1.5.5.8 1.2 1 2.6z"
            fill="#003087"
          />
          <path
            d="M7.8 6.4L6.5 15c0 .3.1.6.4.6h3.5c.3 0 .6-.2.6-.5l.8-5.2c0-.4.4-.7.8-.7h1.9c2.3 0 4.1-.7 5.2-2 1-1.2 1.4-2.5 1.1-4.2-.1-1.4-.5-2.1-1-2.6-.7-.8-1.9-1.1-3.5-1.1H9.5c-.3 0-.6.3-.6.6l-.8 4.9"
            fill="#0070E0"
          />
        </svg>
      </div>

      {/* Discover */}
      <div className="h-8 w-12 rounded border border-gray-200 bg-white flex items-center justify-center">
        <svg className="h-3" viewBox="0 0 32 16" fill="none">
          <rect width="32" height="16" rx="2" fill="#FF6000" />
          <circle cx="24" cy="8" r="6" fill="#F79E1B" />
        </svg>
      </div>

      {/* Amazon Pay */}
      <div className="h-8 w-12 rounded border border-gray-200 bg-white flex items-center justify-center">
        <svg className="h-4" viewBox="0 0 48 24" fill="none">
          <path
            d="M29.5 17c-5.5 4-13.5 6-20.3 6-9.6 0-18.3-3.6-24.8-9.5-.5-.5-.1-1.1.5-.7 6.9 4 15.5 6.4 24.3 6.4 6 0 12.5-1.2 18.5-3.8.9-.4 1.7.6.8 1.3v.3zm2.3-2.6c-.7-.9-4.6-.4-6.4-.2-.5.1-.6-.4-.1-.7 3.1-2.2 8.2-1.6 8.8-.8.6.8-.2 6.3-3.3 8.9-.5.4-.9.2-.7-.3.6-1.6 2-5.1 1.3-5.9h.4z"
            fill="#FF9900"
            transform="translate(12 0)"
          />
          <path
            d="M22.3 2.5v-1.2c0-.2.1-.3.3-.3h5.5c.2 0 .3.1.3.3v1c0 .2-.1.4-.3.7l-2.8 4c1 0 2.1.1 3 .6.2.1.3.3.3.5v1.3c0 .2-.2.4-.4.3-1.4-.7-3.2-.8-4.7 0-.2.1-.4-.1-.4-.3v-1.2c0-.2 0-.6.2-.9l3.3-4.7h-2.9c-.2 0-.3-.1-.3-.3l-.1.2zm-9.8 7.3h-1.7c-.2 0-.3-.1-.3-.3V1.4c0-.2.1-.3.3-.3h1.6c.2 0 .3.1.3.3v1.1h.1c.4-1.1 1.2-1.6 2.2-1.6 1.1 0 1.7.5 2.2 1.6.4-1.1 1.3-1.6 2.3-1.6 .7 0 1.5.3 2 .9.5.7.4 1.7.4 2.6v5c0 .2-.1.3-.3.3h-1.7c-.2 0-.3-.1-.3-.3V4.8c0-.4 0-.9-.1-1.3-.1-.6-.4-.8-1-.8-.4 0-.8.3-1 .7-.2.4-.2.9-.2 1.4v4.7c0 .2-.1.3-.3.3h-1.7c-.2 0-.3-.1-.3-.3V4.8c0-1-.2-2.1-1.1-2.1-.9 0-1.1.9-1.1 2.1v4.7c0 .2-.1.3-.3.3l.3.3zM42 1c2.5 0 3.9 2.2 3.9 4.9 0 2.6-1.5 4.8-3.9 4.8-2.5 0-3.8-2.2-3.8-4.8 0-2.7 1.4-4.9 3.8-4.9zm0 1.8c-1.3 0-1.4 1.7-1.4 2.8 0 1.1 0 3.3 1.4 3.3 1.3 0 1.4-1.9 1.4-3 0-.7 0-1.6-.2-2.3-.1-.6-.4-1-1-.8h-.2zm7.2 7.9h-1.7c-.2 0-.3-.1-.3-.3V1.3c0-.2.1-.3.3-.3h1.6c.2 0 .3.1.3.3v1.2h.1c.5-1.2 1.2-1.7 2.4-1.7.8 0 1.6.3 2.1 1.1.5.7.5 2 .5 2.9v5c0 .2-.1.3-.3.3H52c-.2 0-.3-.1-.3-.3V5c0-.9.1-2.3-1-2.3-.4 0-.8.3-1 .6-.3.5-.3 1-.3 1.5v4.7c0 .2-.1.3-.3.3l.1.2z"
            fill="#221F1F"
          />
        </svg>
      </div>
    </div>
  );
}
