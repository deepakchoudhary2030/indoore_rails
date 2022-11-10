import React, { useState } from 'react';
import Header from '../Header';
import { Link } from 'react-router-dom';
import './category.css';
import CategoryArray from '../CategoriesArray';

function Category() {
  const [items] = useState(CategoryArray);
  return (
    <div>
      <Header />
      <div className="jumbotron-fluid jumb1" key="category">
        <h1>Category</h1>
        <div className="container-fluid jumb1">
          <div className="container flex-item3 ">
            {items.map((elem) => {
              const { id,category, image } = elem;
              return (
                <div className="gy-4 mt-2 my-5" key={id}>
                  <div className="icon-box">
                    <Link className="link1" to={{
                      pathname: '/workers',
                      state: { category }
                    }}><img src={image}
                      className="bd-placeholder-img  m-2 " alt="" width="100em" height="100em" /><br />
                      <p >{category}</p></Link>
                  </div>
                </div>
              )
            })
            }
          </div>
        </div>
      </div>
    </div>
  );
}
export default Category;

