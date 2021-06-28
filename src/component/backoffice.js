import React from 'react';
import { Form, Types, required, min, max, positive, negative, integer } from '../utils/form'

export const BackOffice = (props) => {

  const formSchema = {
    name: {
      type: Types.string,
      label: 'name',
      placeholder: 'Nom de ton perso',
      className: "col-6",
      style: { color: 'red' },

      constraints: {
        required: { message: "le nom est obligatoire" },
      },
      props: {}, //possibilité de merge les props,
      render: () => {} //possibilité de donner un composant pour dessiner un truc spé
    },
    fatherName: {
      type: Types.string,
      label: 'name',
      placeholder: 'Nom du pere du perso',
      className: "col-6",
      style: { color: 'red' },

      constraints: {
        required: { message: "le nom du pere est obligatoire" },
      }
    },
    fatherAge: {
      type: Types.number,
      label: 'age',
      placeholder: 'son age',
      help: "l'age du pere du personnage",

      constraints: {
        required: required("l'age du pere est obligatoire"),
        min: { value: 18, message: "il doit etre majeur" },
        max: max(130, "il doit etre en vie"),
        integer: integer("les demi-années ne compte pas vraiment...gamin"),
        // positive: positive("un age negatif ? il est pas né ton perso ????"),
      }
    },
    age: {
      type: Types.number,
      label: 'age',
      placeholder: 'son age',
      help: "l'age du personnage",

      constraints: {
        required: required("le nom est obligatoire"),
        min: { value: 18, message: "il doit etre majeur" },
        max: max(130, "il doit etre en vie"),
        lessThan: { ref: 'fatherAge', message: "plus jeune que son pere" },
        integer: integer("les demi-années ne compte pas vraiment...gamin"),
        // positive: positive("un age negatif ? il est pas né ton perso ????"),
      }
    }
  }

  const formFlow = [
    {
      label: 'personnage',
      flow: [
        'name',
        'age'
      ],
      collapsed: true
    },
    {
      label: 'pere du personnage',
      flow: [
        'fatherName',
        'fatherAge'
      ],
      collapsed: true
    }
    
  ];


  return (
    <div>
      <h1>BaCk OffIcE</h1>

      <div>
        <Form
          schema={formSchema}
          flow={formFlow}
          onChange={item => console.log({ item })}
        />
      </div>
    </div>
  )
}