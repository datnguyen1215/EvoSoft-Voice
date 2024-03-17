import com from '$lib/com';

const instance = !chrome?.runtime ? com.dom.create() : com.chromium.create();

instance.listen();

export default instance;
