import ClassicEditor from '/imports/js/ckeditor/ckeditor.js';

Template.userPageBlogCreate.onCreated(function () {
  this.ckEditor = null;
});

Template.userPageBlogCreate.onRendered(function () {
  const self = this;

  this.autorun(function () {

    const language = CurrentLocale.get();

    if (!language) {
      return
    }

    Meteor.setTimeout(function () {

      ClassicEditor.create(self.find('#brdBlogHtml'), {
        toolbar: {
          items: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            '|',
            'outdent',
            'indent',
            '|',
            'imageUpload',
            'blockQuote',
            'insertTable',
            'mediaEmbed',
            'undo',
            'redo'
          ]
        },
        language: language.slice(0, 2),
        image: {
          toolbar: [
            'imageTextAlternative',
            'imageStyle:full',
            'imageStyle:side'
          ]
        },
        table: {
          contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells'
          ]
        },
      }).then(editor => {
        self.ckEditor = editor;
      }).catch(error => {
        console.error('Oops, something went wrong!');
        console.error('Please, report the following error on https://github.com/ckeditor/ckeditor5/issues with the build id and the error stack trace:');
        console.warn('Build id: 24wli16rgyf0-nohdljl880ze');
        console.error(error);
      });

    }, 50);
  });
});

Template.userPageBlogCreate.events({
  'submit form#brdBlogCreate': function (event, template) {
    event.preventDefault();
    ErrorHandler.reset(template);

    const title = event.target.title.value;
    const description = event.target.description.value;
    const seoTitle = event.target.seoTitle.value;
    const seoDescription = event.target.seoDescription.value;
    const seoKeywords = event.target.seoKeywords.value;
    const html = template.ckEditor.getData();

    console.log(template.ckEditor);
    console.log(html);

    const obj = {
      blog: {
        // parentCategoryId:parentCategoryId,

        data: {
          en: {
            title: title,
            description: description,
            html: html
          }
        },

        seo: {
          title: seoTitle,
          keywords: seoKeywords,
          description: seoDescription
        },

        status: 'visible'
      }
    };

    LoadingLine.show()
    Meteor.call('public.blogs.create', obj, function (error, result) {
      LoadingLine.hide()

      if (error) {
        ErrorHandler.show(error, template);
        return;
      }

    });
  }
});