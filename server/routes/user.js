

router.get('/withdrawals/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).populate('withdrawals'); // or whatever your schema uses
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    res.status(200).json(user.withdrawals || []);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching withdrawals', error });
  }
});
