import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { API } from "aws-amplify" ;
import {onError} from "../../libs/errorLib";
import config from "../../config";

export default function Settings() {
  const history = useHistory();
  const [stripe, setStripe] = useState(null);

  useEffect(() => {
    setStripe(window.Stripe(config.STRIPE_KEY))
  }, []);

  function billUser(details) {
    return API.post("products", "/billing", {
      body: details
    });
  }

  return (
    <div className="Settings">
      hello im the settings page
    </div>
  )

}