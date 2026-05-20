const signUp = (req, res) => {
  try {
    const { username, email, password, mobile, role } = req.body;

    const user= await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }
    if(mobile.length !== 10){
      return res.status(400).json({ message: "Mobile number must be 10 digits long" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user=await User.create({
        fullname,
        email,
        password: hashedPassword,
        mobile,
        role,
    });

    const token = await genToken(user._id);
    res.cookie("token", token, {
      secure:false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.status(201).json(user);

  } catch (error) {
    res.status(500).json(`Error signing up: ${error}`);
  }
};
