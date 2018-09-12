Models provide getters on the many side of one-to-many relations.
`ManySideModel.getByOneSide(instanceOfOneSide) == [instancesOfManySide]`
`ManySideModel.getTheOneSide() == instanceOfOneSide` This keeps concerns
separated. The references are usually stored on the many side to avoid large
arrays in single documents. Because of this, the many-side knows how to get one
and it self.
