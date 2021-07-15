import React, { useState } from 'react';
import { Form } from '../utils/form'
import * as constraints from '../utils/constraints';
import { Types } from '../utils/types';

import 'bootstrap/dist/css/bootstrap.min.css'

export const BackOffice = (props) => {

  const [user, setUser] = useState(undefined)

  const formSchema = {
    game: {
      type: Types.string,
      label: 'game',
      placeholder: 'url du game',
      defaultValue: 'https://foo.bar',
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
        max: constraints.max(1000, "il doit etre en vie"),
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
        required: constraints.required("l'age est obligatoire"),
        lessThan: constraints.lessThan('fatherAge', 'un fils est plus jeune que son père'),
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
    },
    human: {
      type: Types.bool, //todo: cool si on peu chainer des input ==> input pour le nom de l'espece du perso (option visible peut etre avec une fonction)
      label: 'is human ?',
      help: "le personnage est il humain",
      defaultValue: false
    },
    genre: {
      type: Types.string,
      format: 'select',
      label: 'genre',
      help: "le genre du perso personnage",
      // optionsFrom: "https://formslibtestoptions.opunmaif.fr",
      options: ["male", "female", "non-binary"],
      constraints: {
        required: constraints.required("le genre est obligatoire"),
      }

    },

    species: {
      type: Types.string,
      visible: { ref: 'human', test: is => !is },
      format: 'select',
      label: 'Espèce du perso.',
      help: "l'espece du perso personnage car non humain",
      options: ["elf", "orc", "semi-dragon", "wererat"],
      constraints: {
        when: constraints.when('human', is => !is, {
          required: constraints.required("l'espece est obligatoire")
        }, {
          required: constraints.required("l'espece n'est pas obligatoire")
        })
        // required: constraints.required("l'espece est obligatoire"), //todo: WHEN ==> required just if not human
      }

    },
    weapons: {
      type: Types.object,
      format: 'select',
      isMulti: true,
      label: 'armes',
      help: "les armes du perso personnage",
      optionsFrom: "https://formslibtestoptions.opunmaif.fr",
      // transformer: (value) => ({label: value.weight, value: value.label}),
      // options: [
      //   { label: "toothpick", weight: 0, rarity: 'common' },
      //   { label: "sword", weight: 2, rarity: 'common' }, 
      //   { label: "bazooka", weight: 10, rarity: 'epic' },
      //   { label: "excalibur", weight: 100, rarity: 'legendary' }],
      schema: {
        label: {
          type: Types.string,
        },
        waight: {
          type: Types.number
        },
        rarity: {
          type: Types.string
        }
      },
      constraints: {
        // min: constraints.min(1, 'Pas de combat à mains nues, c\'est dangereux !'),
        length: constraints.length(2, '2 armes obligatoire'),
        test: constraints.test("weight", 'pas plus de 100 kg', value => value.reduce((a, c) => a + c.weight, 0) <= 100)
        //todo: tester when en fonction de l'age
      },

      // createOption: true,

    },
    birthday: {
      type: Types.date,
      label: 'date d\'anniv',
      help: "la date de naissance du personnage",
      constraints: {
        required: constraints.required('required'),
        max: constraints.max(new Date(), 'pas de naissance dans le futur'),
      },
    },
    city: {
      type: Types.string,
      format: 'select',
      label: 'ville',
      help: 'Ville de résidence',
      transformer: (value) => ({label: value.label, value: value.id}),
      options: [{label: 'Neo-Tokyo', id: 1}, {label: 'Asgard', id: 2}, {label: 'Fondcombe', id: 3}],
      constraints: {
        required: constraints.required(`Personne n'habite nulle-part jsuqu'à preuve du contraire`)
      }
    },
    abilities: {
      type: Types.string,
      format: 'array',
      label: 'abilities du perso',
      help: "abilities help..",
      schema: {
        type: Types.string,
        constraints: {
          required: constraints.required('required'),
          min: constraints.min(5, 'au moins 5 lettres'),
        }
      },
      constraints: {
        length: constraints.length(2, '2 abilities obligatoire'),
        max: constraints.max(10, "max 10")
        // moreThan: constraints.length(2, '2 abilities min obligatoire')
      },
    }
  }

  const formFlow = [
    'game',
    'name',
    'age',
    'city',
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
    'species',
    'genre',
    'weapons',
    'birthday',
    'abilities'
  ];

  const thor = {
    game: 'https://foo.dev',
    name: 'Thor',
    age: 211,
    city: 2,
    fatherName: 'Odin',
    fatherAge: '999',
    bio: 'Thor odinson...have a hammer',
    human: true,
    species: undefined,
    genre: 'male',
    weapons: [{ label: "toothpick", weight: 0, rarity: 'common' }, { label: "Mjolnir", weight: 100, rarity: 'legendary' }],
    birthday: new Date('August 19, 1975 23:15:30'),
    abilities: ['Brave', 'Fair', 'Worthy']
  }

  const loki = {
    game: 'https://foo.dev',
    name: 'Loki',
    age: 100,
    city: 2,
    fatherName: 'Odin',
    fatherAge: '999',
    bio: 'Loki...don`t trust him ',
    human: true,
    species: undefined,
    genre: 'male',
    weapons: [{ label: "toothpick", weight: 0, rarity: 'common' }, { label: "sword", weight: 2, rarity: 'rare' }],
    birthday: new Date('August 19, 1985 23:15:30'),
    abilities: ['Vile', 'Unfair', 'Unworthy']
  }


  return (
    <div className="container-xxl my-md-4 bd-layout">
      <h1>BaCk OffIcE</h1>

      <button className="btn btn-info" onClick={() => setUser(loki)}>Loki</button>
      <button className="btn btn-info" onClick={() => setUser(thor)}>Thor</button>

      <div>
        <Form
          schema={formSchema}
          flow={formFlow}
          onChange={item => console.log({ item })}
          value={user}
        />
      </div>
    </div>
  )
}