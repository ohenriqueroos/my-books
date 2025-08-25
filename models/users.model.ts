import dynamoose from "dynamoose";

export const UserSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
    },
    username: {
      type: String,
      required: true,
      rangeKey: true,
      validate: (value) => {
        if (value.toString().length >= 4 && value.toString().length <= 20) {
          return true;
        }
        return false;
      },
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value.toString());
      },
    },
    birthDate: {
      type: {
        value: Date,
        settings: {
          storage: "iso",
        },
      },
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

export const User = dynamoose.model("User", UserSchema);
