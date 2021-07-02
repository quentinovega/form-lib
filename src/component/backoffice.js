import React from 'react';
import { Form } from '../utils/form'
import * as constraints from '../utils/constraints';
import { Types } from '../utils/types';
import { ref } from '../utils/utils'

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
        // required: { message: "le nom est obligatoire" },
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
        // required: { message: "le nom du pere est obligatoire" },
      }
    },
    fatherAge: {
      type: Types.number,
      label: 'age',
      placeholder: 'son age',
      help: "l'age du pere du personnage",

      constraints: {
        // required: constraints.required("l'age du pere est obligatoire"),
        // min: { value: 18, message: "il doit etre majeur" },
        // max: constraints.max(130, "il doit etre en vie"),
        // integer: constraints.integer("les demi-années ne compte pas vraiment...gamin"),
        // // positive: positive("un age negatif ? il est pas né ton perso ????"),
      }
    },
    age: {
      type: Types.number,
      label: 'age',
      placeholder: 'son age',
      help: "l'age du personnage",

      constraints: {
        // required: constraints.required("le nom est obligatoire"),
        // lessThan: constraints.lessThan(ref('fatherAge'), 'un fils est plus jeune que son père'),
        // integer: constraints.integer("les demi-années ne compte pas vraiment...gamin"),
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
    },
    human: {
      type: Types.bool, //todo: cool si on peu chainer des input ==> input pour le nom de l'espece du perso (option visible peut etre avec une fonction)
      label: 'is human ?',
      help: "le personnage est il humain",
      defaultValue: true
    },
    genre: {
      type: Types.select,
      label: 'genre',
      help: "le genre du perso personnage",
      // optionsFrom: "https://formslibtestoptions.opunmaif.fr",
      options: ["male", "female", "non-binary"],
      // createOption: true

    },
    weapons: {
      type: Types.array,
      label: 'armes',
      help: "les armes du perso personnage",
      // optionsFrom: "https://formslibtestoptions.opunmaif.fr",
      // transformer: (value) => ({label: value.weight, value: value.label}),
      options: [
        { label: "toothpick", weight: 0, rarity: 'common' },
        { label: "sword", weight: 2, rarity: 'common' }, 
        { label: "bazooka", weight: 10, rarity: 'epic' },
        { label: "excalibur", weight: 100, rarity: 'legendary' }],
      constraints: {
        // min: constraints.min(1, 'Pas de combat à mains nues, c\'est dangereux !'),
        length: constraints.length(2, '2 armes obligatoire'),
        // test: constraints.test("weight", 'pas plus de 100 kg', value => value.reduce((a, c) => a + c.weight, 0) <= 100)
      },
      
      // createOption: true,

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
    'bio',
    'human',
    'genre',
    'weapons'
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