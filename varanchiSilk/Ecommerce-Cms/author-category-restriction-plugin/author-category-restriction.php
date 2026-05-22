<?php
/*
Plugin Name: Author Category Restriction
Description: Restrict authors to specific categories and media visibility.
Version: 1.1
Author: Custom
*/


/*---------------------------------------------------
ADD CATEGORY SELECTOR IN USER PROFILE
----------------------------------------------------*/

function acr_user_category_field($user) {

    if (!current_user_can('administrator')) return;

    $selected = get_user_meta($user->ID, 'allowed_category', true);

    $categories = get_categories(array('hide_empty' => false));

    ?>
    <h3>Author Category Restriction</h3>
    <table class="form-table">
        <tr>
            <th><label for="allowed_category">Allowed Category</label></th>
            <td>
                <select name="allowed_category" id="allowed_category">
                    <option value="">Select Category</option>
                    <?php foreach ($categories as $cat) { ?>
                        <option value="<?php echo $cat->term_id; ?>" <?php selected($selected, $cat->term_id); ?>>
                            <?php echo $cat->name; ?>
                        </option>
                    <?php } ?>
                </select>
            </td>
        </tr>
    </table>
    <?php
}

add_action('show_user_profile', 'acr_user_category_field');
add_action('edit_user_profile', 'acr_user_category_field');


/*---------------------------------------------------
SAVE USER CATEGORY
----------------------------------------------------*/

function acr_save_user_category($user_id) {

    if (!current_user_can('administrator')) return;

    if (isset($_POST['allowed_category'])) {
        update_user_meta($user_id, 'allowed_category', intval($_POST['allowed_category']));
    }

}

add_action('personal_options_update', 'acr_save_user_category');
add_action('edit_user_profile_update', 'acr_save_user_category');


/*---------------------------------------------------
GET USER CATEGORY
----------------------------------------------------*/

function acr_get_user_category() {

    $user_id = get_current_user_id();
    return get_user_meta($user_id, 'allowed_category', true);

}


/*---------------------------------------------------
SHOW ONLY ALLOWED CATEGORY IN POST EDITOR
----------------------------------------------------*/

add_filter('get_terms', 'acr_limit_categories', 10, 3);

function acr_limit_categories($terms, $taxonomies, $args) {

    if (is_admin() && !current_user_can('administrator')) {

        $allowed = acr_get_user_category();

        if (!$allowed) return $terms;

        foreach ($terms as $key => $term) {
            if ($term->term_id != $allowed) {
                unset($terms[$key]);
            }
        }

    }

    return $terms;
}


/*---------------------------------------------------
FORCE CATEGORY ON POST SAVE
----------------------------------------------------*/

function acr_force_category($post_id) {

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;

    if (!current_user_can('administrator')) {

        $allowed = acr_get_user_category();

        if ($allowed) {
            wp_set_post_categories($post_id, array($allowed));
        }

    }

}

add_action('save_post', 'acr_force_category');


/*---------------------------------------------------
SHOW ONLY USER POSTS
----------------------------------------------------*/

add_filter('pre_get_posts', 'acr_limit_posts');

function acr_limit_posts($query) {

    global $pagenow;

    if (is_admin() && $pagenow == 'edit.php' && !current_user_can('administrator')) {

        $query->set('author', get_current_user_id());

    }

}


/*---------------------------------------------------
SHOW ONLY USER MEDIA
----------------------------------------------------*/

add_filter('ajax_query_attachments_args', 'acr_limit_media');

function acr_limit_media($query) {

    if (!current_user_can('administrator')) {

        $query['author'] = get_current_user_id();

    }

    return $query;
}

/*---------------------------------------------------
LIMIT CATEGORIES IN GUTENBERG EDITOR (REST API)
----------------------------------------------------*/
 
add_filter('rest_category_query', 'acr_limit_rest_categories', 10, 2);
 
function acr_limit_rest_categories($args, $request) {
 
    if (!current_user_can('administrator')) {
 
        $allowed = get_user_meta(get_current_user_id(), 'allowed_category', true);
 
        if ($allowed) {
            $args['include'] = array($allowed);
        }
 
    }
 
    return $args;
}