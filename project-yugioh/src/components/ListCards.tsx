import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardImage } from '../types/type'
import YugiohContext from '../context/YugiohContext'

import style from './ListCards.module.css'

type Props = {
  propType: string;
}

export default function ListCards({ propType }: Props) {
  const { cardList } = useContext(YugiohContext)
  const [itemsToShow, setItemsToShow] = useState(() => {
    const storedItemsToShow = localStorage.getItem('itemsToShow');
    return storedItemsToShow ? parseInt(storedItemsToShow) : 18;
  })

  useEffect(() => {
    localStorage.setItem('itemsToShow', itemsToShow.toString());
  }, [itemsToShow]);

  const card = cardList.filter((card: Card) => card.type.includes(propType))

  if (!cardList) {
    return <div>Loading...</div>
  }

  const renderImage = (id: number, name:string, img:CardImage) => {
    const { image_url } = img[0]

    return (
      <div key={id} className={style.card}>
        <Link to={`/card/${id}`} target="_blank">
          <img src={ image_url} alt={`Imagem do ${name}`} />
        </Link>
      </div>
    )
  }

  return (
    <>
      <section className={style.container}>
        {card.slice(0, itemsToShow).map(({id, name, card_images}) => (
          renderImage(id, name, card_images)
        ))}
      </section>
      {itemsToShow < card.length && (
          <button onClick={() => setItemsToShow(itemsToShow + 18)}>
            Mostrar Mais
          </button>
      )}
    </>
  )
}
