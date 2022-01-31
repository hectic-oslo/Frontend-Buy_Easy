import React from 'react';
import {Helmet} from "react-helmet"

const MetaTags = ({title="Welcome to Buy-Easy",
description="Buy Anything at cheapest price",
keywords="iPhone,electric items,laptop,project,react,mern"}) => {
  return <Helmet>
        <title>{title}</title>
        <meta name='description' content={description}/>
        <meta name='keywords' content={keywords}/>
  </Helmet>;
};

export default MetaTags;
