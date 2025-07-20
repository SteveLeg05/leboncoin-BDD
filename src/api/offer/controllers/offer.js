"use strict";

/**
 * offer controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::offer.offer", ({ strapi }) => ({
  async deleteAll(ctx) {
    try {
      const userId = ctx.state.user.id;
      //   console.log(userId); 2
      const user = await strapi.entityService.findOne(
        "plugin::users-permissions.user",
        userId,
        { populate: ["offers"] }
      );
      //   console.log(user);

      for (let i = 0; i < user.offers.length; i++) {
        const offer = user.offers[i];
        // console.log(offer); 5
        await strapi.entityService.delete("api::offer.offer", offer.id); //
      }

      return "All offers deleted";
    } catch (error) {
      ctx.response.status = 500;
      return { message: error.message };
    }
  },

  // async create(ctx) {
  //   try {
  //     // console.log(ctx.state.user); // affiche les infos de la personne qui fait la requête
  //     const requesterId = ctx.state.user.id;
  //     // console.log(typeof ctx.request.body.data); // {"title": "MacBookAir", "price": 1200, "owner":1} ==> string

  //     const parseBody = JSON.parse(ctx.request.body.data);
  //     // console.log(typeof parseBody); // { title: 'MacBookAir', price: 1200, owner: 1 } ==> objet
  //     console.log(parseBody);
  //     const ownerId = parseBody.owner;

  //     if (requesterId !== ownerId) {
  //       ctx.response.status = 403; // Forbidden
  //       return { message: "You are not allowed to create this offer" };
  //     } else {
  //       const { data, meta } = await super.create(ctx); // Call the default create method
  //       return { data, meta };
  //     }
  //     return "Hello";
  //   } catch (error) {
  //     ctx.response.status = 500;
  //     return { message: error.message };
  //   }
  // },
}));
