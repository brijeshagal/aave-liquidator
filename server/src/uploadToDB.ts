import mongoose from "mongoose";
import userSchema from "./schema/user";
import { data } from "./results";

const User = mongoose.model("UserDetails", userSchema);

export const addMultipleUsers = async () => {
  try {
    const bulkOperations = Object.entries(data).map(
      ([address, userDetails]) => ({
        updateOne: {
          filter: { address },
          update: { $set: { address, ...userDetails } },
          upsert: true,
        },
      })
    );

    await User.bulkWrite(bulkOperations);

    console.log("Users data added/updated successfully.");
  } catch (error) {
    console.error("Error adding users:", error);
  }
};
