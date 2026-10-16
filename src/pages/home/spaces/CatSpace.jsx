/** 用户提供的猫咪合照；花色来自确认，未提供姓名时使用品种/花色称呼。 */
import React from 'react';
import '../../../design-system/room/spaces/cats.css';
export function CatSpace({ id }) {
  return <section className="cat-space">
    <header><p className="space-kicker">TWO CATS / ONE HOME</p><h1>小屋里的<br />两位室友。</h1><p>{id === 'cat-blue' ? '英短蓝白 · 圆脸，蓝灰与白色相间。' : id === 'cat-tabby' ? '浅棕色虎斑 · 浅棕底色，深色条纹。' : '一只英短蓝白，一只浅棕色虎斑。'}</p></header>
    <figure><img src={`${import.meta.env.BASE_URL}cats/together.jpeg`} alt="后方的英短蓝白和前方的浅棕色虎斑一起趴着" /><figcaption><span>英短蓝白 & 浅棕色虎斑</span><span>一起待着的日常 · 01</span></figcaption></figure>
  </section>;
}
