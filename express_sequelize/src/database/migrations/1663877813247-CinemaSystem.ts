import { QueryInterface } from 'sequelize';

import { ModelAttributes } from 'sequelize/types/model';

export default {
  /**
   # ToDo: Create a migration that creates all tables for the following user stories

   For an example on how a UI for an api using this might look like, please try to book a show at https://in.bookmyshow.com/.
   To not introduce additional complexity, please consider only one cinema.

   Please list the tables that you would create including keys, foreign keys and attributes that are required by the user stories.

   ## User Stories

   **Movie exploration**
   * As a user I want to see which films can be watched and at what times
   * As a user I want to only see the shows which are not booked out

   **Show administration**
   * As a cinema owner I want to run different films at different times
   * As a cinema owner I want to run multiple films at the same time in different showrooms

   **Pricing**
   * As a cinema owner I want to get paid differently per show
   * As a cinema owner I want to give different seat types a percentage premium, for example 50 % more for vip seat

   **Seating**
   * As a user I want to book a seat
   * As a user I want to book a vip seat/couple seat/super vip/whatever
   * As a user I want to see which seats are still available
   * As a user I want to know where I'm sitting on my ticket
   * As a cinema owner I don't want to configure the seating for every show
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  up: async (queryInterface: QueryInterface) => {

    await queryInterface.createTable('user', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      username: { type: 'varchar' },
      password: { type: 'varchar' },
      fullName: { type: 'varchar' }
    } as ModelAttributes);

    await queryInterface.createTable('movie', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: 'varchar' },
      genre: { type: 'varchar' },
    } as ModelAttributes);

    await queryInterface.createTable('showroom', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: 'varchar' },
      capacity: { type: 'integer' },
    } as ModelAttributes);

    await queryInterface.createTable('seattype', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: 'varchar' },
      extraPricePercentage: { type: 'double(5, 2)' },
    } as ModelAttributes);

    await queryInterface.createTable('show', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      movieId: {
        type: 'integer',
        allowNull: false,
        references: {
          model: {
            tableName: 'movie',
          },
          key: 'id',
        },
        onDelete: 'cascade',
      },
      showroomId: {
        type: 'integer',
        allowNull: false,
        references: {
          model: {
            tableName: 'showroom',
          },
          key: 'id',
        },
        onDelete: 'cascade',
      },
      showTime: { type: 'datetime' },
      seatPrice: { type: 'double(5, 2)' }
    } as ModelAttributes);

    await queryInterface.createTable('booking', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: 'integer',
        allowNull: false,
        references: {
          model: {
            tableName: 'user',
          },
          key: 'id',
        },
        onDelete: 'cascade',
      },
      showId: {
        type: 'integer',
        allowNull: false,
        references: {
          model: {
            tableName: 'show',
          },
          key: 'id',
        },
        onDelete: 'cascade',
      },
      seatNo: { type: 'integer' },
      seatType: {
        type: 'integer',
        allowNull: false,
        references: {
          model: {
            tableName: 'seatType',
          },
          key: 'id',
        },
        onDelete: 'cascade',
      }
    } as ModelAttributes);

  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  down: (queryInterface: QueryInterface) => {
    // do nothing
  },
};
