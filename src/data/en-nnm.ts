import type { Project } from './zh';

export const nnm: Project = {
  slug: 'nnm-platform',
  no: '03',
  cover: { kind: 'image', src: 'assets/projects/nnm/s-1.png' },
  title: 'Neural Network Training & Model Management Platform',
  short: 'A locally run desktop application that brings model configuration, training, testing, inference and management together.',
  repo: 'https://github.com/XDkoala/NNMTMPlatform',
  repoLabel: 'XDkoala/NNMTMPlatform',
  nature: 'Desktop application that began as a first-year course project',
  start: 'November 2025',
  status: 'Not maintained',
  tags: ['C++17', 'Qt 6 Widgets', 'LibTorch', 'OpenCV', 'CMake', 'CPU / CUDA'],
  summary:
    'A locally run tool for neural-network training and model management that brings model configuration, training, testing, inference, visualization and local storage into one desktop application. The project supports numeric regression and classification, image classification, and management of ANN/CNN models, and was later organized into a CMake project with a portable Windows build.',
  contribution: ['Developed the models and the training, testing and inference logic.', 'Implemented data and model persistence, and the project build and release.'],
  sections: [
    {
      type: 'list',
      title: 'What it covers',
      items: [
        'ANN/CNN training, testing and inference workflows.',
        'Local storage of model metadata, weights, normalization parameters and label mappings.',
        'Training loss curves, and regression and classification analysis views.',
        'Model search, filtering, a drafts box and a recycle bin.',
        'CPU/CUDA device selection and runtime verification.',
        'CMake build and a portable Windows release package.',
      ],
    },
    {
      type: 'viewer',
      title: 'Interface and features',
      frame: 'window',
      intro: ['A local neural-network visualization platform for numeric prediction and image classification: through the graphical interface, users create models, import data, monitor training, evaluate on test data and run batch inference, and manage models with search, filtering, a drafts box and a recycle bin. The order shown is: platform overview → model creation and training → classification evaluation → regression evaluation → model inference → model management.'],
      items: [
        { tag: 'Overview', src: 'assets/projects/nnm/s-1.png', title: 'Home page', caption: 'Models for different tasks shown together as cards, with entry points to use, test, retrain, edit and delete them.' },
        { tag: 'Create & train', src: 'assets/projects/nnm/s-2.png', title: 'Add a new model', caption: 'Fill in the model information, choose the task type, number of input features and network structure, import training data and start training.' },
        { tag: 'Create & train', src: 'assets/projects/nnm/s-3.png', title: 'Training view', caption: 'Shows training progress, the training and validation loss curves and a per-epoch training log, making the training process easy to follow.' },
        { tag: 'Classification', src: 'assets/projects/nnm/s-4.png', title: 'Classification test page', caption: 'Using cat-vs-dog binary classification as an example, shows accuracy, Macro-F1 and misclassified samples to see how a classification model performs on the test set.' },
        { tag: 'Classification', src: 'assets/projects/nnm/s-5.png', title: 'Classification performance analysis', caption: 'A confusion matrix and per-class recall show the classification results and how errors are distributed.' },
        { tag: 'Regression', src: 'assets/projects/nnm/s-6.png', title: 'Regression test page', caption: 'Using house-price prediction as an example, shows the test-set mean squared error and each sample’s predicted value, true value and residual.' },
        { tag: 'Regression', src: 'assets/projects/nnm/s-7.png', title: 'Regression performance analysis', caption: 'A scatter plot of predicted against true values, with an ideal reference line and a fitted line, helps show a regression model’s bias.' },
        { tag: 'Inference', src: 'assets/projects/nnm/s-8.png', title: 'Model inference page', caption: 'Loads a trained image-classification model, runs batch inference on imported data and outputs the predicted class for each item.' },
        { tag: 'Management', src: 'assets/projects/nnm/s-9.png', title: 'Search and filter', caption: 'Keyword search combined with task-type filtering helps quickly find the model to use or manage.' },
        { tag: 'Management', src: 'assets/projects/nnm/s-10.png', title: 'Drafts box', caption: 'Keeps model configurations that have not started training so they can be edited and trained later, or discarded.' },
        { tag: 'Management', src: 'assets/projects/nnm/s-11.png', title: 'Recycle bin', caption: 'Manages deleted models in one place, supporting restoring, permanent deletion and emptying the recycle bin.' },
      ],
      credit: 'The metrics in the screenshots only show how the displayed models performed on that particular test data and do not represent general performance on other datasets or in real applications.',
    },
    { type: 'text', title: 'Positioning', paras: ['The project is positioned as a course project and a learning showcase tool.'] },
    { type: 'links', title: 'Further reading', items: [{ label: 'Repository README', url: 'https://github.com/XDkoala/NNMTMPlatform/blob/main/README.md' }] },
  ],
};
