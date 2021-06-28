import React from 'react';
import { Form } from '../utils/form'
import * as constraints from '../utils/constraints';
import { Types } from '../utils/types';
import {ref, groups} from '../utils/utils'

export const BackOffice = (props) => {

  const formSchema = {
    game: {
      type: Types.string,
      label: 'game',
      placeholder: 'url du game',
      constraints: {
        url: constraints.url()
      }
    },
    name: {
      type: Types.string,
      label: 'name',
      placeholder: 'Nom de ton perso',
      className: "col-6",
      style: { color: 'red' },

      constraints: {
        required: { message: "le nom est obligatoire" },
      },
      props: {}, //todo: possibilité de merge les props,
      render: () => { } //todo: possibilité de donner un composant pour dessiner un truc spé
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
        required: constraints.required("l'age du pere est obligatoire"),
        min: { value: 18, message: "il doit etre majeur" },
        max: constraints.max(130, "il doit etre en vie"),
        integer: constraints.integer("les demi-années ne compte pas vraiment...gamin"),
        // positive: positive("un age negatif ? il est pas né ton perso ????"),
      }
    },
    age: {
      type: Types.number,
      label: 'age',
      placeholder: 'son age',
      help: "l'age du personnage",

      constraints: {
        required: constraints.required("le nom est obligatoire"),
        lessThan: constraints.lessThan(ref('fatherAge'), 'un fils est plus jeune que son père'),
        integer: constraints.integer("les demi-années ne compte pas vraiment...gamin"),
      }
    },
    bio: {
      type: Types.text,
      label: 'biographie',
      placeholder: 'raconte ton histoire',
      help: "bio du personnage",
      props: {
        rows: 10,
        cols: 70
      }
    }
  }

  const formFlow = [
    'game',
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
    },
    'bio'

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