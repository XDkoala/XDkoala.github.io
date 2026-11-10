import type { Project } from './zh';

const M = 'https://github.com/XDkoala/Mini-ViT';
const n = (f: string) => `${M}/blob/main/notes/${f}.md`;
const G1 = 'Project entry points';
const G2 = 'Key notes: experiments, predictions and reviews';
const G3 = 'More notes: implementation, benchmarks and acceptance';
const G4 = 'Data and reproduction materials';

export const vit: Project = {
  slug: 'mini-vit',
  no: '02',
  cover: { kind: 'image', src: 'assets/projects/minivit/fig-00.png' },
  title: 'MiniViT',
  short: 'A Vision Transformer built from scratch, with comparisons, ablations and evaluation on CIFAR-10.',
  repo: M,
  repoLabel: 'XDkoala/Mini-ViT',
  nature: 'Deep learning experiment project',
  start: 'August 2026',
  status: 'Not maintained',
  tags: ['Python', 'PyTorch', 'Vision Transformer', 'Ablation', 'Multi-seed', 'Corruption Evaluation', 'CORe50', 'Attention Rollout'],
  summary:
    'I implemented the core MiniViT modules from scratch and, on CIFAR-10, completed training, a CNN comparison, architecture ablations and training-strategy studies, then went on to multi-seed evaluation, efficiency measurement, image-corruption tests, CORe50 cross-session transfer and attention visualization. The project aims at a complete, explainable and reproducible experimental workflow.',
  contribution: [
    'I led the project, covering model implementation, the training and evaluation pipeline, experiment design, result analysis, visualization and documentation.',
    'The core code and tests were written in collaboration with Codex, so I do not claim to have written all the code on my own; the recording of predictions and the review of results were done by me.',
  ],
  sections: [
    {
      type: 'list',
      title: 'What it covers',
      items: [
        'Implemented the core modules myself: Patch Embedding, attention and the Transformer Encoder.',
        'Compared MiniViT with a CNN of similar parameter count under one shared training pipeline.',
        'Ran single-variable ablations on Patch Size, Encoder Depth and data augmentation.',
        'Compared training and regularization strategies, and ran multi-seed evaluation.',
        'Organized training curves, error cases, attention visualization, the experiment report and a reproduction guide.',
      ],
    },
    {
      type: 'text',
      title: 'Representative experiment: regularization comparison with limited training data',
      paras: [
        'What I wanted to verify at the time: with limited training data, which kind of regularization improves MiniViT’s generalization the most? I originally favored Label Smoothing, thinking it is a gentle change and probably more stable, and I worried that mixing images might make the model hard to learn.',
        'The experiment fixed the model architecture, data split and training budget: the same 45,000 training images, 5,000 validation images and 100-epoch budget on CIFAR-10, and under a common training configuration it compared a baseline without advanced regularization, Label Smoothing, Mixup and CutMix.',
      ],
    },
    {
      type: 'chart',
      title: 'Validation results, single seed (42)',
      intro: ['The chart shows best validation accuracy. The axis starts at 80% to make the differences visible; these are all validation results, recorded separately from the final test accuracy.'],
      bars: [
        { label: 'Baseline R0 (no advanced regularization)', value: 83.64 },
        { label: 'Label Smoothing', value: 83.52 },
        { label: 'Mixup', value: 84.56 },
        { label: 'CutMix', value: 86.92, hl: true },
      ],
      after: [
        'CutMix improved on the baseline by 3.28 percentage points. A later paired comparison on the same data split over training seeds 42, 123 and 2026 showed the improvement in the same direction for all three seeds, averaging 2.947 ± 0.510 percentage points (mean ± sample standard deviation, about 2.95 points; no statistical significance test was done).',
        'My understanding is that smoothing labels is not the same as adding visual variation; CutMix may reduce the model’s reliance on any single local cue through local replacement. But this is only a mechanism consistent with the results, not a proven causal relationship.',
        'This experiment made me realize that theoretical intuition should be used to form hypotheses rather than to replace controlled experiments, and that neither short-term convergence speed nor training accuracy can stand for final generalization.',
      ],
    },
    {
      type: 'stats',
      title: 'Key results and how to read them',
      items: [
        { num: 86.26, dec: 3, suffix: '%', label: 'CIFAR-10 test accuracy (advanced recipe)', note: 'Three training seeds, mean ± 0.159% (sample standard deviation, not a confidence interval)' },
        { num: 88.29, dec: 2, suffix: '%', label: 'Baseline CNN test accuracy', note: 'A CNN of similar parameter count, using the shared training pipeline' },
        { num: 80.65, dec: 2, suffix: '%', label: 'Baseline MiniViT test accuracy', note: 'The epoch-80 weights chosen by validation accuracy' },
        { num: 53.82, dec: 2, suffix: '%', label: 'CORe50 fine-tune test accuracy', note: '16.93 points above training from scratch; same objects across sessions' },
      ],
      notes: [
        'The complete final recipe improves the single-run test result over the baseline ViT by about 5.61 percentage points, and this cannot be credited entirely to CutMix.',
        'The results do not show that ViT is generally better than a CNN; 86.26% is a CIFAR-10 source-domain result and 53.82% a CORe50 target-domain result, and the two must not be mixed.',
        'The corruption tests cover six types at three severities, 18 conditions in all: the advanced MiniViT averages 69.01% and the CNN 68.77%; which is better differs by corruption, so I do not claim an overall lead.',
        'The CORe50 transfer uses a split by session over the same objects; it does not show generalization to unseen object instances, and it is not an object-detection or robot-deployment result.',
        'The original environment and an independent fresh environment each passed 479 tests, as recorded in the 2026-10-11 acceptance.',
      ],
    },
    {
      type: 'viewer',
      title: 'Experiment gallery',
      intro: ['From the regularization comparison, training and baselines, transfer and visualization, to the corruption protocol. Click the large image to enlarge it.'],
      items: [
        { tag: 'Regularization', src: 'assets/projects/minivit/fig-00.png', title: 'Regularization comparison', caption: 'With the training setup fixed, CutMix’s best validation accuracy is 86.92%, above R0’s 83.64%; the paired validation improvement over three training seeds is 2.947 ± 0.510 percentage points.', note: 'The left is the single-seed, 100-epoch formal experiment; the right shows the three-seed validation results for R0 and CutMix. All are validation results, not test metrics; the standard deviation of the differences is not a confidence interval.' },
        { tag: 'Training & baselines', src: 'assets/projects/minivit/fig-04.png', title: 'Baseline MiniViT training curves', caption: 'The 100-epoch training and validation curves of the baseline MiniViT. Training keeps improving while validation loss rises late, suggesting overfitting; the epoch-80 weights were chosen by validation accuracy.', note: 'This model’s test accuracy is 80.65%; this is not the training curve of the final advanced recipe, which reaches 86.26%.' },
        { tag: 'Training & baselines', src: 'assets/projects/minivit/fig-05.png', title: 'CNN baseline training curves', caption: 'A CNN with a similar parameter count was compared under the shared training pipeline; its baseline test accuracy on this task is 88.29%, above both the baseline and the advanced MiniViT.', note: 'Used to show fair comparison and where each architecture applies; it does not support claiming that every CNN beats every ViT.' },
        { tag: 'Training & baselines', src: 'assets/projects/minivit/fig-06.png', title: 'Baseline MiniViT confusion matrix', caption: 'The baseline MiniViT’s errors on the CIFAR-10 test set analyzed by class, locating confusion between similar-looking classes such as cats and dogs.', note: 'The vertical axis is the true class and the horizontal axis the predicted class, with colors normalized by true-class row; it does not show per-class results of the final advanced model.' },
        { tag: 'Training & baselines', src: 'assets/projects/minivit/fig-07.png', title: 'Baseline MiniViT high-confidence errors', caption: 'Samples where the baseline MiniViT gives a high softmax score but predicts wrongly, used to look at class confusion and prediction reliability.', note: 'The cases were selected by a fixed ranking, not randomly sampled, and are not used to estimate the overall error rate.' },
        { tag: 'Transfer & visualization', src: 'assets/projects/minivit/fig-01.png', title: 'MiniViT attention and noise cases', caption: 'Compares the original image, last-layer CLS attention and cross-layer Attention Rollout, and shows how they change when Gaussian noise is added to the same image.', note: 'Fixed validation-set correct cases of the advanced source-domain model, not proof of overall robustness on the test set; each heat map is scaled independently, so colors should not be compared across images, and this is not causal attribution.' },
        { tag: 'Transfer & visualization', src: 'assets/projects/minivit/fig-02.png', title: 'CORe50 correct cases', caption: 'The encoder trained on CIFAR-10 is transferred to CORe50, showing the fine-tuned model’s predictions, attention and noise response on target-domain object images.', note: 'Fixed validation cases; a few correct images must not stand in for the overall 53.82% target-domain test result.' },
        { tag: 'Transfer & visualization', src: 'assets/projects/minivit/fig-03.png', title: 'CORe50 error cases', caption: 'Error samples from cross-domain recognition are kept, to examine confident misclassifications and attention distribution and to show the model’s remaining limits under changes of background, lighting and scale.', note: 'Softmax scores are uncalibrated and cannot be read as reliable probabilities of being correct; the selected cases are not an estimate of the error rate.' },
        { tag: 'Transfer & visualization', src: 'assets/projects/minivit/fig-09.png', title: 'CORe50 data and input resolution', caption: 'Training examples of the ten CORe50 object classes, and a preview of the input after downscaling from 128×128 to 32×32, showing the information lost between the target domain and the low resolution.', note: 'Used to introduce the transfer task; it is not a detection or real-robot deployment result, and the split is by session over the same objects, so it does not show generalization to unseen object instances.' },
        { tag: 'Corruption tests', src: 'assets/projects/minivit/fig-08.png', title: 'Corruption protocol examples', caption: 'Examples of six image corruptions at three severities each, used to check the model’s sensitivity to lighting, noise, blur, occlusion and translation on a common input.', note: 'It shows what was tested and does not by itself prove the model’s robustness.' },
      ],
      credit: 'Project and figures compiled by Soren Yao, MiniViT v1.0.0. Sample images come from CIFAR-10 or CORe50; rights to the original materials belong to their respective owners; attention maps are for descriptive analysis only.',
    },
    {
      type: 'qa',
      title: 'Questions I kept asking',
      intro: ['In this project I kept pressing on why Q and K are separate, how multi-head projection differs from a single head, how position encodings are learned, and where the limits lie in training randomness and in judging generalization. Below are some of those questions and the understanding I reached in my project notes. Click to expand.'],
      items: [
        { tag: 'Attention', q: 'Why are Q and K projected separately?', a: ['If Q = K, the pairwise score k_i·k_j before the softmax is necessarily symmetric. With independent projections, score(i, j) = q_i·k_j and score(j, i) = q_j·k_i can differ, so the model can express a directed relation such as “i needs j a lot, but j does not need i as much” — it models the compatibility of need and supply, not merely similarity.', 'Q = K is not a wrong design; it is a stronger inductive bias from parameter sharing, and could be run as an ablation after the standard model is done, comparing parameter count and accuracy.'] },
        { tag: 'Attention', q: 'What is the essential difference between multi-head and single-head attention?', a: ['Multi-head does not simply cut the original 192-dimensional token into six pieces. It first applies a learnable projection and then splits: each head extracts its own 32-dimensional summary from all 192 dimensions and learns relations in its own representation space.', 'What makes it single-head or multi-head is not how many big matrices the code uses but how many independent attention distributions there are: a single head gives softmax(S1+…+SA), one map, while multi-head gives softmax(S1)…softmax(SA), A maps. A fused QKV projection is just parallel computation.'] },
        { tag: 'Attention', q: 'Why divide the attention scores by √d_k?', a: ['A dot product is a sum of d_k products; under the simplifying assumption of roughly independent components with mean 0 and variance 1, its variance is about d_k. Dividing by √d_k keeps the scale of the scores entering the softmax stable; without scaling, the softmax easily saturates toward one-hot and the gradients go to zero.', 'In a multi-head implementation one should use each head’s √Dh (here √32), not the full √D or the token count √N.'] },
        { tag: 'Position & pooling', q: 'Position encodings are randomly initialized, so how do they acquire positional meaning?', a: ['Without a positional mechanism the model treats an image as a bag of unordered patches and cannot tell up from down or left from right from content alone. This project uses a learnable absolute position encoding, randomly initialized only once when the model is created and trained afterwards like any other parameter.', 'The random initial values first give different positions stable, distinguishable “addresses”; because token indices stay bound to fixed image regions, the classification gradient gradually gives each address a task-useful meaning. It is not constrained to be a pure geometric coordinate; a more accurate description is “learnable parameters bound to sequence position”. A fixed-length [1, 65, D] also means the encoding must be interpolated if the resolution changes.'] },
        { tag: 'Position & pooling', q: 'Why can the CLS token represent the whole image?', a: ['CLS is a trainable initial vector shared by all images and carries no image information at first; once added to the sequence, it acts as a query and reads that image’s patches through multiple attention layers. The classification loss produces logits only through the final CLS, which forces it to learn to extract what is useful for classification.', 'Its function comes from the model structure and the loss path, not from the variable name. Mean pooling is another reasonable choice; this project uses CLS to get a dedicated summary position that runs through the whole encoder.'] },
        { tag: 'Architecture', q: 'What is the difference between Pre-Norm and Post-Norm?', a: ['In Post-Norm the gradient must pass through LayerNorm; in Pre-Norm the main residual path carries an identity term that bypasses LayerNorm, and the complex branch always receives input at a relatively stable scale, so it is usually better suited to training deeper Transformers stably.', 'But both are valid architectures; Pre-Norm improves optimization stability and does not guarantee better results on every task. With Pre-Norm, a complete model also normally adds one final LayerNorm after all encoder blocks.'] },
        { tag: 'Training objective', q: 'What exactly does Label Smoothing change?', a: ['A class index is mathematically equivalent to a one-hot target. Label Smoothing does not simply shrink the loss or gradient; it changes the target distribution: for CIFAR-10 at ε = 0.1, the correct class gets a target of 0.91 and each of the nine wrong classes 0.01. The gradient is still p − q_smooth, and when the model is overconfident, part of the gradient can reverse and pull the prediction back from an extreme distribution.', 'The key point is that it only softens the supervision target and adds no variation at the image level. This was the starting point of my later realization that “a gentle change” and “better generalization” cannot be equated.'] },
        { tag: 'Architecture comparison', q: 'Why is the CNN stronger on this task?', a: ['The input is only 32×32 and the training set is small; a CNN’s inductive biases of local connectivity and weight sharing happen to suit the task, while a ViT has to learn the relations between tokens from the data itself, which hurts it more with little data. In the experiments the improved MiniViT is still below the CNN, with higher inference latency and higher peak training memory.', 'But I also remind myself that this comparison only supports “the ranking under the current protocol”; it cannot on its own prove that inductive bias is the only cause, and it is certainly not the general conclusion that “a CNN is always better than a ViT”.'] },
        { tag: 'Evaluation', q: 'Why select recipes on the validation set and use the test set only once?', a: ['Both the recipe and the best epoch are chosen from the validation set only; the test set is used for final evaluation after the recipe is frozen, and test results must not be used to pick a recipe in return.', 'The data bear this rule out: training seed 2026 had the highest validation accuracy but the lowest test accuracy. Validation ranking does not guarantee test ranking, and picking on the test set would mistake chance fluctuation for a pattern.'] },
        { tag: 'Interpretability', q: 'Can Attention Rollout prove that the model “saw” the object?', a: ['No. Rollout averages the multi-head attention of each layer, adds an identity matrix to approximate the residual, normalizes row by row and multiplies layer by layer, tracing an approximate path from the final CLS back to the original patches. It ignores the effects of Value content, the MLP and normalization, and is not a causal measurement of pixel contribution.', 'In the cases I also saw that a correct CORe50 image can become a confident softmax misclassification after noise is added, showing that a high score is not the same as reliability; each heat map is normalized separately, so colors cannot be compared across images either. So I treat it as an aid for looking at the model, not as evidence.'] },
        { tag: 'Evaluation', q: 'How does training randomness affect conclusions?', a: ['Fixing the training seed fixes parameter initialization, the shuffling of the training set, random augmentation and CutMix’s sampling sequence. A single run only tells you the result of one random training trajectory.', 'So I used three training seeds and made paired comparisons within each seed, without dropping worse seeds or rerunning until the result looked better after seeing the mean. Three seeds only give preliminary evidence of “consistent direction, acceptable fluctuation” and cannot support a strong claim of significance.'] },
      ],
    },
    {
      type: 'predict',
      title: 'Predictions before experiments, and reviews',
      intro: ['Before each experiment I write down my predictions; once I have the results I compare them item by item to see which intuitions held and which missed something important. Wrong predictions are valuable too, because they point at where my understanding was oversimplified.'],
      rows: [
        { topic: 'Patch Size', verdict: 'Partly matched', predict: 'Validation accuracy p2 > p4 > p8; training speed p8 > p4 > p2. I thought finer visual information would offset the higher risk of overfitting.', actual: 'Validation accuracy p4 (81.84%) > p2 (80.02%) > p8 (77.30%); training speed p8 > p4 > p2, so the speed ranking was entirely right.', lesson: 'Treating “keeping more information” as “validation accuracy rises monotonically” was too optimistic. p2 raises the token count from 64 to 256, and the extra capacity turned more into training fit. A smaller Patch Size is not always better; p4 gives the best balance of detail, training difficulty and compute cost.' },
        { topic: 'Encoder Depth', verdict: 'Partly matched', predict: 'Validation accuracy d9 > d6 > d3; d9’s training accuracy rises slightly and its generalization gap grows.', actual: 'Validation accuracy d6 (81.84%) > d9 (81.46%) > d3 (81.16%); d9’s training accuracy is 1.02 points above d6’s and its generalization gap is 0.94 points larger.', lesson: 'I judged the direction of overfitting correctly, but equated “greater expressive power” directly with “better generalization under the current protocol”. Going to nine layers brought no validation gain; with a single seed, the 0.38-point gap between d6 and d9 cannot be read as a stable advantage.' },
        { topic: 'Data augmentation', verdict: 'Matched', predict: 'Without augmentation, training accuracy is higher, validation accuracy lower and the generalization gap larger, because the model “just memorizes the training set”.', actual: 'Training accuracy 97.94% > 95.20%; best validation accuracy 72.64% < 81.84%; generalization gap 27.08 > 13.84 points. All three directions held.', lesson: 'The direction was right, but “just memorizing” works as an intuition and not as a mechanism: a model without augmentation only keeps seeing fixed pixel layouts and more easily exploits chance regularities of position, orientation and local detail. Accuracy, loss and the generalization gap also have to be read together.' },
        { topic: 'Learning-rate schedule: Cosine', verdict: 'Partly matched', predict: 'Best validation accuracy Cosine > constant learning rate, though the difference may be small; Cosine’s best epoch comes later and its late validation curve is steadier.', actual: 'Cosine raised the best validation accuracy from 81.84% to 82.94%, a 1.10-point gain that exceeded the expectation that “the difference may be small”; the best epoch was 79 versus 80, almost the same; over the last 20 epochs the standard deviation of validation accuracy fell from 0.360 to 0.217, but that of validation loss actually rose from 0.0182 to 0.0215.', lesson: 'The direction was right and the size underestimated. “The best epoch comes later” did not hold: a smaller late learning rate does not guarantee the peak is delayed, and the model can reach a good region earlier and mostly just maintain it afterwards. A steadier accuracy also does not imply a steadier loss, since cross-entropy depends on the confidence of the wrong samples as well.' },
        { topic: 'Learning-rate schedule: Warmup', verdict: 'Matched', predict: 'Best validation accuracy with and without Warmup is close; in the first 5 epochs training loss falls faster without Warmup and early gradients fluctuate more.', actual: 'Best validation accuracy differs by only 0.02 points; in the first 5 epochs training loss is lower every epoch without Warmup; the standard deviation of the gradient norm over the first 5 epochs is 0.343 versus 0.117.', lesson: 'The prediction largely held, but it made me correct one statement: after Warmup the absolute gradient is actually larger, so the correct reading is “the change is steadier”, not “the gradient is smaller”. Warmup directly limits the size of parameter updates and only afterwards indirectly changes the gradient trajectory.' },
        { topic: 'Gradient clipping', verdict: 'Partly matched', predict: 'Clipping acts more like a “fuse that only trips occasionally”, catching a few abnormal gradient spikes, so it has little effect on best accuracy. The counter-signal I wrote down in advance: if the trigger rate stays close to 100% for long, this guess fails.', actual: 'The recipe with clipping is only 0.08 points higher than without, so the accuracy prediction held; but the average trigger rate is as high as 99.54%, 78 of 100 epochs triggered 100%, and all 100 epochs were ≥ 90%.', lesson: 'The accuracy judgment was right and the mechanism judgment wrong. Clip norm 1.0 clips almost every batch and is a continuous optimization constraint, not a fuse. One possibility is that AdamW’s second-moment normalization cancels part of the overall scaling, but that is only a conjecture and does not justify saying clipping “has no effect”.' },
        { topic: 'Regularization strength (short-run screening)', verdict: 'Partly matched', predict: 'I was unsure about each pair of strengths and leaned, with low confidence, toward the stronger one: Label Smoothing 0.10, Mixup 0.4, CutMix 1.0, on the intuition that with a small training set stronger regularization is needed.', actual: 'Only Label Smoothing 0.10 had a slight edge (0.32 points higher), and it did not reach the pre-registered selection threshold; Mixup 0.4 and CutMix 1.0 were both weaker than the milder settings, and CutMix 0.5 was 1.36 points above 1.0.', lesson: '“The training set is small, so use stronger regularization” named only the potential benefit and missed that a too-strong strategy weakens the useful supervision signal: Mixup keeps the whole image and its label blurred, and CutMix’s local replacement is more drastic. Strength and generalization are usually not monotonic, and the pre-registered threshold kept me from chasing a 0.32-point wobble.' },
        { topic: 'Regularization method', verdict: 'Opposite', predict: 'Validation accuracy Label Smoothing > Mixup > CutMix > baseline, worrying that image-mixing regularization was too strong.', actual: 'CutMix 86.92% > Mixup 84.56% > baseline 83.64% > Label Smoothing 83.52%; the paired improvement was positive for all three seeds, averaging +2.947 ± 0.510 points.', lesson: 'I inferred “best generalization” from “gentle change, stable curve”. In fact Label Smoothing only changes target confidence and adds no image-level variation, while CutMix forces the model to learn more transferable local evidence under occlusion and local replacement, which helps MiniViT more. The cross-method ranking from 30-epoch short runs also did not carry over to the 100-epoch formal results, so short runs can only be used to screen strengths within one method. I began to treat intuition as a hypothesis to be tested, and to revise it with fair comparisons, multiple seeds and failure records.' },
      ],
      after: [
        'I later added a few rules to my own predictions: predict training fit, validation generalization, parameter count and speed separately instead of guessing a single accuracy; consider non-monotonic relations, such as “a medium Patch Size or depth may be best”; write down at least one opposite outcome and its possible mechanism; state in advance what result would overturn the guess; and stay restrained about single-seed differences of a few tenths of a point, never writing random fluctuation up as a firm pattern.',
      ],
    },
    {
      type: 'list',
      title: 'The experimental rules I set for myself',
      intro: 'These rules were not there from the start; they were forced out of repeated “wrong guesses” and near self-deceptions.',
      items: [
        'Write the prediction before running the experiment: the predictions for O0–O3 and R1–R3 were written before the output directories were created, not revised after the results were revealed, and in the review each was marked as matched, partly matched or not matched.',
        'Pre-register selection rules: before screening regularization strengths I fixed the rule that “a stronger setting is chosen only if both the best validation accuracy and the mean of the last 5 epochs lead by a set margin, otherwise fall back to the milder one”, so that I would not chase small fluctuations afterwards.',
        'Choose recipes on the validation set only: the test set is used only after the recipe is frozen and never to modify it; all three training seeds are kept, no worse seed is dropped, and no extra run is made to make the mean look better.',
        'Results must be traceable: formal runs are made on a clean git commit, and runs with uncommitted changes in the working tree do not enter the statistics (the first R1, run before committing, is kept in the “skipped” list); timing anomalies caused by system sleep are excluded explicitly instead of being explained as the cost of a method.',
        'Do not fabricate history: 7 baseline evaluations lack the commit record of the original run and can only be checked through weight hashes and predictions; I kept them as explicit exceptions rather than filling in a version number afterwards.',
        'Conclusions carry their limits: source-domain and target-domain numbers are not mixed; small single-seed differences are not written up as patterns; and the improvement of the whole recipe over the baseline is not credited entirely to one component.',
      ],
    },
    {
      type: 'text',
      title: 'Questions I want to answer next',
      paras: [
        'The main outcome of this project is a complete experimental chain from model implementation to frozen evaluation, not proof that one kind of architecture is generally better. It also leaves questions I have not answered: transfer to new object instances (rather than the same objects across sessions), the effect of the target-domain learning rate and input resolution, and a stronger CNN baseline.',
        'If I continue, I will treat them as new experiments and run them only after writing a new validation protocol, rather than using test results I have already seen to optimize this round’s conclusions in reverse.',
      ],
    },
    {
      type: 'links',
      title: 'Further reading',
      items: [
        { group: G1, tag: 'Repo', label: 'Repository README', url: `${M}/blob/main/README.md`, desc: 'Highlights, result tables, model structure and quick start.' },
        { group: G1, tag: 'Repo', label: 'Release v1.0.0', url: `${M}/releases/tag/v1.0.0`, desc: 'The release entry point for code, lightweight experiment artifacts and documentation.' },
        { group: G1, tag: 'Report', label: 'Final experiment report', url: n('FINAL_EXPERIMENT_REPORT'), desc: 'Full conclusions and limits: protocol, ablations, optimization and regularization, multiple seeds, efficiency, corruption and transfer.' },
        { group: G2, tag: 'Notes', label: 'Stage 12: Regularization comparison', url: n('STAGE_12_NOTES'), desc: 'Pre-registered screening rules, formal comparison and prediction review for Label Smoothing, Mixup and CutMix.' },
        { group: G2, tag: 'Notes', label: 'Stage 13: Multiple random seeds', url: n('STAGE_13_NOTES'), desc: 'Paired gains over three training seeds, statistics and freezing the final recipe.' },
        { group: G2, tag: 'Notes', label: 'Stage 7: Three ablations', url: n('STAGE_7_NOTES'), desc: 'Predictions before the experiments for Patch Size, Encoder Depth and augmentation, with item-by-item review.' },
        { group: G2, tag: 'Notes', label: 'Stage 11: Optimization strategy', url: n('STAGE_11_NOTES'), desc: 'Predictions and review for Cosine, Warmup and gradient clipping, including the counter-evidence on the clipping trigger rate.' },
        { group: G2, tag: 'Notes', label: 'Stage 16: Cross-domain transfer', url: n('STAGE_16_NOTES'), desc: 'Why CORe50, session-based splits to prevent frame leakage, three transfer settings and prediction review.' },
        { group: G2, tag: 'Notes', label: 'Stage 15: Corruptions and robustness', url: n('STAGE_15_NOTES'), desc: 'Pre-registered 6 corruption types × 3 severities, comparing the weaknesses of CNN and MiniViT and analyzing mechanisms.' },
        { group: G3, tag: 'Notes', label: 'Stage 2: Attention and Encoder', url: n('STAGE_2_NOTES'), desc: 'Implementation and derivation of Patch Embedding, multi-head attention, the MLP and Pre-Norm.' },
        { group: G3, tag: 'Notes', label: 'Stage 6: CNN baseline', url: n('STAGE_6_NOTES'), desc: 'Fair-comparison principles, the inductive bias of convolution and the CNN baseline results.' },
        { group: G3, tag: 'Notes', label: 'Stage 10: Experiment protocol and traceability', url: n('STAGE_10_NOTES'), desc: 'Decoupling training seed from split seed, the experiment status lifecycle and strict aggregation rules.' },
        { group: G3, tag: 'Notes', label: 'Stage 14: Efficiency and resource benchmark', url: n('STAGE_14_NOTES'), desc: 'Fixed-protocol measurement of parameters, MACs, latency, throughput and memory, and the joint accuracy–cost conclusion.' },
        { group: G3, tag: 'Notes', label: 'Stage 17: Attention Rollout', url: n('STAGE_17_NOTES'), desc: 'Derivation of cross-layer attention rollout, its interpretation limits, fixed cases and single-image inference.' },
        { group: G3, tag: 'Notes', label: 'Stage 18: Frozen evaluation and final acceptance', url: n('STAGE_18_NOTES'), desc: 'Evaluating the other two seeds, consolidating all evidence, and keeping the traceability exception for the baseline results.' },
        { group: G4, tag: 'Report', label: 'Advanced experiment results', url: n('ADVANCED_EXPERIMENT_RESULTS'), desc: 'Full results and statistical conventions of the advanced experiments.' },
        { group: G4, tag: 'Report', label: 'Frozen recipe manifest', url: n('ADVANCED_MINIVIT_FINAL'), desc: 'The frozen recipe, the weights of the three seeds and the evaluation rules.' },
        { group: G4, tag: 'Report', label: 'Baseline experiment ledger', url: n('EXPERIMENT_RESULTS'), desc: 'Raw metrics, timings and anomaly records of the baseline experiments.' },
        { group: G4, tag: 'Overview', label: 'Project introduction and talking points', url: n('PROJECT_PRESENTATION'), desc: 'How to present the project in demos and interviews, resume wording and common follow-up questions.' },
        { group: G4, tag: 'Repro', label: 'Reproduction guide', url: n('REPRODUCTION_GUIDE'), desc: 'Reproduction entry points, environment and resource budget.' },
        { group: G4, tag: 'Data', label: 'CORe50 dataset card', url: n('DATASET_CARD'), desc: 'Source, frame sampling and split rules, license and integrity records of the transfer dataset.' },
      ],
    },
  ],
};
