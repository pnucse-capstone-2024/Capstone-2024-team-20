import { useState } from 'react';
import { Merch } from '../../utils/type';
import styles from '../styles/MerchandiseBasket.module.css';
import MerchandiseCard from './MerchandiseCard';
import { numberToMoney } from '../../utils/convert';
import Button from '../common/Button';
import { fetchWithHandler } from '../../utils/fetchWithHandler';
import { buyMerchandises } from '../../apis/merchandise';

interface MerchandiseBasketProps {
  namespace,
  eventName: string;
  merchandiseList: Merch[];
}

export default function MerchandiseBasket({
  eventName,
  namespace,
  merchandiseList,
}: MerchandiseBasketProps) {
  const [cart, setCart] = useState<number[]>([...new Array(merchandiseList.length)].map(() => 0));

  const handleAddCart = (index) => {
    setCart((prev) => {
      const newCart = [...prev];
      newCart[index] += 1;

      return newCart;
    });
  };

  const handleRemoveCart = (index) => {
    setCart((prev) => {
      const newCart = [...prev];
      if (newCart[index] > 0) {
        newCart[index] -= 1;
      }

      return newCart;
    });
  };

  const handleBuyMerchandise = () => {
    const merchandises = [];
    cart.forEach((c, index) => {
      for (let i = 0; i < c; i += 1) {
        merchandises.push({
          name: merchandiseList[index].name,
          price: merchandiseList[index].price,
          eventName,
        });
      }
    });

    fetchWithHandler(() => buyMerchandises(
      namespace,
      merchandises,
    ), {
      onSuccess: async (response) => {
        console.log(response);
        const tempStr = [];
        for (let i = 0; i < cart.length; i += 1) {
          if (cart[i] > 0) {
            tempStr.push({
              name: merchandiseList[i].name,
              price: merchandiseList[i].price * cart[i],
              count: cart[i],
            });
          }
        }
        localStorage.setItem('merchandiseTemp', JSON.stringify(tempStr));

        if (response.data?.kakaoReadyResponse) {
          const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

          if (isMobile) {
            window.location.href = response.data.kakaoReadyResponse.next_redirect_mobile_url;
          } else {
            window.location.href = response.data.kakaoReadyResponse.next_redirect_pc_url;
          }
        } else {
          alert('구매가 완료되었습니다.');
          window.location.reload();
        }
      },
      onError: () => {
        alert('구매에 실패하였습니다.');
      },
    });
  };

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.title}>상품 목록</div>
        <ul className={styles.merchandiseList}>
          {merchandiseList.map((merchandise, index) => (
            <li key={merchandise.name}>
              <MerchandiseCard
                index={index}
                data={merchandise}
                setCart={setCart}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.merchandiseBasket}>
        <ul>
          {cart.map((count, index) => count > 0 && (
          <li
            key={`${merchandiseList[index].name} 장바구니`}
            className={styles.selectedMerchandise}
          >
            <img
              src={merchandiseList[index].image}
              alt={`${merchandiseList[index].name} 장바구니 이미지`}
              className={styles.cartImage}
            />
            <div className={styles.cartName}>{merchandiseList[index].name}</div>
            <div className={styles.countController}>
              <button
                type="button"
                className={styles.button}
                onClick={() => handleAddCart(index)}
              >
                <svg width="16" height="16" viewBox="0 0 100 100">
                  <line x1="50" y1="20" x2="50" y2="80" stroke="black" strokeWidth="10" />
                  <line x1="20" y1="50" x2="80" y2="50" stroke="black" strokeWidth="10" />
                </svg>
              </button>
              <div>
                {count}
                {' '}
                개
              </div>
              <button
                type="button"
                className={styles.button}
                onClick={() => handleRemoveCart(index)}
              >
                <svg width="16" height="16" viewBox="0 0 100 100">
                  <line x1="20" y1="50" x2="80" y2="50" stroke="black" strokeWidth="10" />
                </svg>
              </button>
            </div>
            <div className={styles.cartPrice}>
              {numberToMoney(merchandiseList[index].price * count)}
              {' '}
              원
            </div>
          </li>
          ))}
        </ul>
        {cart.reduce((acc, cur) => acc + cur, 0) > 0
        && (
        <div className={styles.totalContainer}>
          <div className={styles.totalInfo}>
            <div>
              총
              {' '}
              {cart.reduce((acc, cur) => acc + cur, 0)}
              {' '}
              개
            </div>
            <div>
              {numberToMoney(
                cart.reduce((acc, cur, index) => acc + merchandiseList[index].price * cur, 0),
              )}
              {' '}
              원
            </div>
          </div>
          <Button onClick={handleBuyMerchandise}>구매하기</Button>
        </div>
        )}
      </div>
    </div>
  );
}
