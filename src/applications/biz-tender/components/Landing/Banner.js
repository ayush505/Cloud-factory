import { Image } from 'antd';
import React from 'react';

import banner from '../../resources/images/banner.svg';

export default function Banner() {
  return <Image src={banner} preview={false} />;
}
