"use client"
import { useEffect } from 'react';

const BotpressChat = () => {
  useEffect(() => {
    // Inject the first script (Botpress Webchat)
    const botpressScript = document.createElement('script');
    botpressScript.src = 'https://cdn.botpress.cloud/webchat/v2.2/inject.js';
    botpressScript.async = true;
    document.body.appendChild(botpressScript);

    // Inject your custom script
    const customScript = document.createElement('script');
    customScript.src = 'https://files.bpcontent.cloud/2024/12/29/17/20241229170742-EQPKHCR9.js';
    customScript.async = true;
    document.body.appendChild(customScript);

    // Clean up scripts on component unmount
    return () => {
      document.body.removeChild(botpressScript);
      document.body.removeChild(customScript);
    };
  }, []);

  return null; // No visible UI for this component
};

export default BotpressChat;