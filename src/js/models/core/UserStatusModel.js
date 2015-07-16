import AbstractModel from '../AbstractModel';

const modelDefaults {
	logged : false
};

class UserStatusModel extends AbstractModel {

	constructor() {
		super(modelDefaults);
	}

}

export default UserStatusModel;
